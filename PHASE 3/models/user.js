const mongoose = require(`mongoose`);
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
    favorites: [{type: Schema.Types.ObjectId, ref: 'Drink'}],
    displayphoto: {type: String},
    isAdmin: {type: Boolean, required: true}
});
const UserModel = mongoose.model(`User`, userSchema);

exports.getAllUsers = function (sort, next) {
    UserModel.find({}).sort(sort)
    .exec(function(err, result) {
        if (err) throw err
        
        var userObjects = [];

        result.forEach(function(doc) {
            userObjects.push(doc.toObject());
        });
  
        next(userObjects);
    });
}

exports.checkUser = function (filter, next) {
    UserModel.find(filter)
    .exec(function(err, result) {
        next(result);
    })
}

exports.getUser = function (filter, next) {
    UserModel.findOne(filter)
    .exec(function(err, result) {
        // console.log("nahanap ko");
        // console.log(result);
        next(err, result);
    })
}

//not checked yet
exports.getFavorites = function (filter, next) {
    UserModel.findOne(filter)
    .populate('favorites')
    .exec(function(err, result) {
        next(err, result.favorites);
    })
}

exports.create = function (obj, next) {
    const user = new UserModel(obj);
    
    user.save(function(err, user) {
        next(err, user);
    });
}

// exports.getUser = function (user, drink, next) {
//     UserModel.findOne(filter)
//     .exec(function(err, result) {
//         // console.log("nahanap ko");
//         // console.log(result);
//         next(err, result);
//     })
// }