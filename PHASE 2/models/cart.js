const mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer: {type:Schema.Types.ObjectId, ref:'User'},
    drink: [{type: Schema.Types.ObjectId, ref: 'DrinkOrder'}],
    totalprice: {type: Number, required: true}
});

mongoose.model(`Cart`, cartSchema);