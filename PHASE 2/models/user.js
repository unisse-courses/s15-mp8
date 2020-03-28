const mongoose = require(`mongoose`);
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname: {type: String, required: true},
    nickname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    favorites: [{type: Schema.Types.ObjectId, ref: 'Favorite'}],
    displayphoto: {type: Buffer},
    isAdmin: {type: Boolean, required: true}
});

userSchema.plugin(mongooseUniqueValidator);

mongoose.model(`User`, userSchema);