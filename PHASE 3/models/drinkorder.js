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

//not checked
exports.create = function (obj, next) {
    const drinkorder = new DrinkOrderModel(obj);
    
    drinkorder.save(function(err, drinkorder) {
        next(err, drinkorder);
    });
}