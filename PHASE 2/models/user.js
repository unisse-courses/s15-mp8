const mongoose = require(`mongoose`);
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: {type: String, required: true},
    nickname: {type: String, required: true},
    emailAddress:  {
                type: String, 
                required: true
                // unique: true,
                // match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            },
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    favorites: [{type: Schema.Types.ObjectId, ref: 'Favorite'}],
    displayphoto: {type: String},
    isAdmin: {type: Boolean, required: true}
});

userSchema.plugin(mongooseUniqueValidator);

const UserModel = mongoose.model(`User`, userSchema);