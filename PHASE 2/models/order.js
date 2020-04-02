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
    .populate({path: 'cart', populate:[{path: 'drinks', populate: { path: 'drink' }}]})
    .exec(function(err, result) {
        if (err) throw err
        
        var orderObjects = [];
        var drinkOrderObjects = []
        var counter = 0;

        result.forEach(function(doc) {
            console.log("order found" + doc);
            
            
            ((doc.toObject()).cart.drinks).forEach(function(drinks) {
                drinkOrderObjects.push(drinks);
                console.log("drinkorder found" + (drinkOrderObjects[counter].drink.name));
                // console.log("drinkorder found" + (drinks.drink.name));
                // console.log("drinkorder found" + (doc.toObject()).cart.drinks[counter].drink.name);
                counter++;
            })
            
            orderObjects.push(doc.toObject());
        });
  
        next(orderObjects, drinkOrderObjects);
    })
}