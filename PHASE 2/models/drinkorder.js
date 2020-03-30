const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drinkOrderSchema = new Schema({
    drinkorderid: {type: Number, required: true},
    drinkid: {type: Schema.Types.ObjectId, ref:'Drink'},
    size: {type: String, required: true},
    quantity: {type: Number, required:true},
    requests: {type: String}
});

mongoose.model(`DrinkOrder`, drinkOrderSchema);

//drinkorderid int
//drinkid {FK} from drinks
// size String
// quantity int
// requests String