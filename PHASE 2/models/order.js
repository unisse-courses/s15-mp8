const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer: {type: Schema.Types.ObjectId, ref:'User'},
    cart: {type: Schema.Types.ObjectId, ref: 'Cart'},
    status: {type: String, enum: ['Received', 'Preparing', 'Ready'], default: 'Received', required: true},
    orderdate: {type: Date, default: Date.now, required: true}
    // totalprice: {type: Number, required: true}
});
 
const orderModel = mongoose.model(`Order`, orderSchema);

exports.getOrderHistory = function (customer, next) {
    orderModel.find(customer).sort({orderdate: -1})
    // .populate({path: 'cart', populate:{path: 'drinks'}})
    .populate({path: 'cart', populate:{path: 'drinks'}})
    .exec(function(err, docs) {
        if (err) throw err
        
        var orderObjects = [];
        // var drinkOrderObjects = []

        var options = {
            path: 'drinks',
            model: 'DrinkOrder'
        };

        orderModel.populate(docs, options, function (err, result) {
            result.forEach(function(doc) {
                console.log("order found" + doc);
                // console.log("drinkorder found" + (doc.toObject()).cart.drinks);
                orderObjects.push(doc.toObject());
                // drinkOrderObjects.push((doc.toObject()).cart.drinks);
            });
      
            next(orderObjects); 
        });
    })
}