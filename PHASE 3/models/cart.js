const mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

const DrinkOrder = require('./drinkorder');

var cartSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer: {type:Schema.Types.ObjectId, ref:'User'},
    drinks: [{type: Schema.Types.ObjectId, ref: 'DrinkOrder'}],
    totalprice: {type: Number, required: true}
});

const CartModel = mongoose.model(`Cart`, cartSchema);

exports.getCart = function (cartid, next) {
    CartModel.findOne({_id: cartid})
    .populate({path: 'drinks', populate: { path: 'drink' }})
    .exec(function(err, result) {
        if (err) throw err
            
        console.log("cart found: " + result);
        next(err, result.toObject());
    });
}

//not yet checked
exports.create = function (obj, next) {
    const cart = new CartModel(obj);
    
    cart.save(function(err, cart) {
        next(err, cart);
    });
}