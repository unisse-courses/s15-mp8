const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drinkSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    picture: {type: String, required:true},
    category:   {
                    type: String, 
                    enum: ['Espresso', 'Chocolate', 'Teavana Teas', 'Frappuccino', 'Coffee Craft'],
                    required: true
                },
    pricelist:{type: Schema.Types.ObjectId, ref: 'Prices'}
});

const DrinkModel = mongoose.model(`Drink`, drinkSchema);

exports.getDrink = function (name, next) {
    DrinkModel.findOne(name)
    .exec(function(err, result) {
        next(err, result);
    })
}

exports.getDrinksByCategory = (category, sort, next) => {
    DrinkModel.find(category).sort(sort).populate('pricelist').exec(function(err, result) {
        if (err) throw err
        var drinkObjects = [];

        result.forEach(function(doc) {
            drinkObjects.push(doc.toObject());
        });
        
        next(drinkObjects);
    });
}

exports.getNewlyAdded = function (next) {
    DrinkModel.find().sort({$natural: -1}).limit(5).exec(function(err, result) {
        if (err) throw err
        var drinkObjects = [];

        result.forEach(function(doc) {
            drinkObjects.push(doc.toObject());
        });
        
        next(drinkObjects);
    });
}

exports.create = function (obj, next) {
    const drink = new DrinkModel(obj);
    
    drink.save(function(err, drink) {
        next(err, drink);
    });
}

exports.update = function (drinkid, obj, next) {
    DrinkModel.findOne({_id: drinkid})
    .exec(function(err, drink) {
        drink.name = obj.name;

        if (obj.picture != null)
            drink.picture = obj.picture;

        drink.save();

        next (err, drink);
    })
}