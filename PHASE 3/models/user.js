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

// exports.checkUser = function (filter, next) {
//     UserModel.find(filter)
//     .exec(function(err, result) {
//         next(result;
//     })
// }

exports.getUser = function (filter, next) {
    UserModel.findOne(filter)
    .exec(function(err, result) {
        next(err, result.toObject());
    })
}

//not checked yet
exports.getFavorites = function (filter, next) {
    var favorites = [];
    
    UserModel.findOne(filter)
    .populate('favorites')
    .exec(function(err, result) {
        result.favorites.forEach(function(doc) {
            console.log("Your fav: " + doc.name)
            favorites.push(doc.toObject())
        })
        
        next(err, favorites);
    })
}

exports.create = function (obj, next) {
    const user = new UserModel(obj);
    
    user.save(function(err, user) {
        next(err, user);
    });
}

exports.addToFavorites = function (userid, obj, next) {
    UserModel.findOne({_id: userid})
    .populate('favorites')
    .exec(function(err, user) {
        var index;
        var counter = 0;
        var check = false;

        user.favorites.forEach(function(doc) {
            if (doc.name == obj.name)
                index = counter;
            counter++;
        })

        console.log("index is " + index);

        if (index > -1) {
            check = true;
        }
        
        if(!check) {
            user.favorites.push(obj);

            user.save();
        }
        

        next(err, user.toObject(), check);
    })
};

exports.deleteFavorite = function (userid, obj, next) {
    UserModel.findOne({_id: userid})
    .populate('favorites')
    .exec(function(err, user) {
        // var index = user.favorites.indexOf(obj);

        // console.log("obj name is " + obj.toObject().name);
        // console.log("index is " + index + " name is " + user.favorites[index]);

        var index;
        var counter = 0;

        user.favorites.forEach(function(doc) {
            if (doc.name == obj.name)
                index = counter;
            counter++;
        })

        if (index > -1) {
            user.favorites.splice(index, 1);
        }

        user.save();

        next(err, user.toObject());
    })
}

exports.updateUser = function (userid, updateuser, next) {
    var existing = false;
    var obj;

    UserModel.findOne({_id: userid})
    .exec(function(err, user) {

        UserModel.findOne({emailAddress: updateuser.emailAddress})
        .exec(function(err, u) {
            // console.log("user: " + user._id);
            // console.log("u: " + u._id);
            // console.log("isEqual " + ((u._id).toString() == (user._id).toString()))
            if(u) {

                if(((u._id).toString() != (user._id).toString())) {
                    existing = true;
                    obj = u;
                } else {
                    user.fullname = updateuser.fullname;
                    user.nickname = updateuser.nickname;
                    user.password = updateuser.nickname;
                    user.emailAddress = updateuser.emailAddress;
                    user.phone = updateuser.phone;
                    user.password = updateuser.password;

                    if (updateuser.displayphoto != null)
                        user.displayphoto = updateuser.displayphoto

                    user.save();

                    obj = user;
                }
            } else {

                user.fullname = updateuser.fullname;
                user.nickname = updateuser.nickname;
                user.password = updateuser.nickname;
                user.emailAddress = updateuser.emailAddress;
                user.phone = updateuser.phone;
                user.password = updateuser.password;

                if (updateuser.displayphoto != null)
                    user.displayphoto = updateuser.displayphoto

                user.save();

                obj = user;
            }
            next(err, obj, existing);
        })
    })
}