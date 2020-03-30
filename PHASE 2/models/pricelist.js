const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceSchema = new Schema ({
    tall: {type: Number, required: true},
    grande: {type: Number, required: true},
    venti: {type: Number, required: true}
});

const priceModel = mongoose.model(`Prices`, priceSchema);