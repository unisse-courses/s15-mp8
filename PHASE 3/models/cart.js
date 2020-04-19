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
    var counter = 0;

    CartModel.findOne({_id: cartid})
    .populate({path: 'drinks', populate: { path: 'drink' }})
    .exec(function(err, result) {
        if (err) throw err
        
        result.drinks.forEach(function(docs) {
            counter += docs.quantity
        })

        console.log("cart found: " + result);
        next(err, result.toObject(), counter);
    });
}

exports.create = function (obj, next) {
    const cart = new CartModel(obj);
    
    cart.save(function(err, cart) {
        next(err, cart);
    });
}

exports.addDrink = function (cartid, drinkorder, next) {
    CartModel.findOne({_id: cartid})
    .populate('drinks')
    .exec(function(err, result) {
        if (err) throw err

        result.drinks.push(drinkorder);

        var totalprice = 0;

        result.drinks.forEach(function(doc) {
            totalprice += parseInt(doc.price);
        })

        result.totalprice = totalprice;

        result.save();

        next(err, result)
    })
}

exports.updateTotal = function (cartid, next) {
    var total = 0;

    CartModel.findOne({_id: cartid})
    .populate('drinks')
    .exec(function(err, result) {
        if (err) throw err

        result.drinks.forEach(function(doc) {
            total += parseInt(doc.price);
        })

        result.totalprice = total;

        result.save();

        next(err, result)
    })
}

exports.deleteDrink = function (cartid, drinkorderid, total, next) {
    CartModel.findOne({_id: cartid})
    .populate('drinks')
    .exec(function(err, result) {
        if (err) throw err

        result.drinks.pull({_id: drinkorderid});
        console.log("updated cart"+ result);
        console.log("drinkorderid: " + drinkorderid);

        result.totalprice = total;

        result.save();

        next(err, result)
    })
}