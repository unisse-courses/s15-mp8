const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drinkOrderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    drink: {type: Schema.Types.ObjectId, ref:'Drink'},
    size: {type: String, enum:["Tall", "Grande", "Venti"], required: true},
    quantity: {type: Number, required:true},
    requests: {type: String, default: "n/a"}, 
    price: {type: Number, required: true}
});

const DrinkOrderModel = mongoose.model(`DrinkOrder`, drinkOrderSchema);

exports.create = function (obj, next) {
    const drinkorder = new DrinkOrderModel(obj);
    
    drinkorder.save(function(err, drinkorder) {
        next(err, drinkorder);
    });
}

exports.updateQuantity = function (drinkorderid, quant, newprice, next) {
    DrinkOrderModel.findOneAndUpdate({_id: drinkorderid}, {$set: {quantity: quant, price: newprice}})
    .exec(function(err, result) {
        next(err, result)
    })
}

exports.updateRequest = function (drinkorderid, request, next) {
    DrinkOrderModel.findOneAndUpdate({_id: drinkorderid}, {$set: {requests: request}})
    .exec(function(err, result) {
        next(err, result)
    })
}

exports.deleteDrink = function (drinkorderid, next) {
    DrinkOrderModel.findOneAndDelete({_id: drinkorderid})
    .exec(function(err, result) {
        next(err, result);
    })
}