const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceSchema = new Schema ({
    tall: {type: Number, required: true},
    grande: {type: Number, required: true},
    venti: {type: Number, required: true}
});

const PriceModel = mongoose.model(`Prices`, priceSchema);

exports.create = function (obj, next) {
    const price = new PriceModel(obj);
    
    price.save(function(err, price) {
        next(err, price);
    });
}

exports.update = function (priceid, obj, next) {
    PriceModel.findOne({_id: priceid})
    .exec(function(err, pricelist) {
        pricelist.tall = obj.tall;
        pricelist.grande = obj.grande;
        pricelist.venti = obj.venti;

        pricelist.save();

        next (err, pricelist);
    })
}