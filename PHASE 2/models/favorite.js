const mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    drink: {type: Schema.Types.ObjectId, ref: 'Drink'}
});

mongoose.model(`Favorite`, favoriteSchema);