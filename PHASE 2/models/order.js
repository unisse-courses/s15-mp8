const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ordernum: {type: Number, required: true},
    customer: {type: Schema.Types.ObjectId, ref:'User'},
    cart: {type: Schema.Types.ObjectId, ref: 'Cart'},
    status: {type: String, enum: ['Received', 'Preparing', 'Ready', 'Done'], default: 'Received', required: true},
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
        
        var drinkOrderObjects;

        var ordersArray = [];

        result.forEach(function(doc) {
            
            drinkOrderObjects = new Array();

            ((doc.toObject()).cart.drinks).forEach(function(drinks) {
                drinkOrderObjects.push(drinks);
                // console.log("drinkorder found" + (drinkOrderObjects[counter].drink.name));
                // console.log("drinkorder found" + (drinks.drink.name));
                // console.log("drinkorder found" + (doc.toObject()).cart.drinks[counter].drink.name);
                // counter++;
            })
            
            var orders = {
                details: doc.toObject(),
                drinkorders: drinkOrderObjects
            }

            ordersArray.push(orders);
        });
  
        next(ordersArray);
    })
}

exports.create = function (obj, next) {
    const order = new orderModel(obj);
    
    order.save(function(err, user) {
        next(err, user);
    });
}

exports.countOrders = function () {
    orderModel.countDocuments({}, function( err, count){
        return count;
    });
}