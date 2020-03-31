const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drinkOrderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    drink: {type: Schema.Types.ObjectId, ref:'Drink'},
    size: {type: String, required: true},
    quantity: {type: Number, required:true},
    requests: {type: String}
});

mongoose.model(`DrinkOrder`, drinkOrderSchema);

