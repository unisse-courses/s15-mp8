const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer: {type: Schema.Types.ObjectId, ref:'User'},
    cart: {type: Schema.Types.ObjectId, ref: 'Cart'},
    status: {type: String, enum: ['Received', 'Preparing', 'Ready'], default: 'Received', required: true},
    orderdate: {type: Date, default: Date.now, required: true},
    totalprice: {type: Number, required: true}
});
 
mongoose.model(`Order`, orderSchema);
