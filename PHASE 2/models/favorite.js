const mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'User'},
    drink: {type: Schema.Types.ObjectId, ref: 'Drink'}
});

const FavoriteModel = mongoose.model(`Favorite`, favoriteSchema);


exports.getFavorites = function (customer, next) {
    FavoriteModel.find(customer)
    .populate({path: 'drink', populate: { path: 'drink' }})
    .exec(function(err, result) {
        if (err) throw err
        
        var favoriteObjects = [];

        result.forEach(function(doc) {
            favoriteObjects.push(doc.toObject());
        });
  
        next(favoriteObjects);
    })
}