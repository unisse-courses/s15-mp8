const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerid: {type:Schema.Types.ObjectId, ref:'User'},
    drinkorder: {type: Schema.Types.ObjectId, ref: 'DrinkOrder'},
    status: {type: String, enum: ['received', 'preparing', 'ready'], default: 'received',required: true},
    orderdate: {type: Date, default: Date.now, required: true},
    totalprice: {type: Number, required: true}

});

mongoose.model(`Orders`, orderSchema);
//ordenum {PK} int
//customerid {FK} int
// drinkorder DrinkOrder
//status (received, preparing, ready)
// orderdate date
//totalprice double