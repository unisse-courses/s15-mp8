const mongoose = require('mongoose');

const UserModel = require('../models/user')
const Cart = require('../models/cart');

const User = mongoose.model('User');

exports.registerView = (req, res) => {
    res.render('register',  { 
        title: 'Register - Starbucks Assist', 
        layout: 'home', 
        isRegister: true,
        js: 'register.js',
        css: ['header-footer.css', 'content-register.css'] });
};

exports.registerProcess = (req, res) => {
    console.log("pasok post route");
    var result;
    UserModel.checkUser({ emailAddress: req.body.emailAddress }, user => {
        if (user.length >= 1) {
            result = { success: false, message: "Email already exists!" }
            insertUser(req, res, result.success, result.message);
        }
        else{   
            result = { success: true, message: "User created! Please login to access you account." }
            insertUser(req, res, result.success, result.message);
        }     
    })
};

exports.login = (req,res) => {
    UserModel.getUser({emailAddress: req.body.emailAddress, password: req.body.password}, user => {
      if (user == null) {
            console.log( "user not found");
            result = {success: false, message: "Email or password is incorrect." }
            res.send(result);
        }
        else{   
            console.log( "user found:", user);
            result = {success: true, isAdmin: user.isAdmin};
            res.send(result);
        }
    });
}

function insertUser(req, res, success, message) {
    var user = new User();
    user._id = new mongoose.Types.ObjectId(),
    user.fullname = req.body.fullname;
    user.nickname = req.body.nickname;
    user.emailAddress = req.body.emailAddress;
    user.phone = req.body.phone;
    user.password = req.body.password;
    user.displayphoto = "default.png";
    user.isAdmin = false;

    console.log ("before saving: " + user);

    if(success) {
        console.log("1: " + req.body.password + " 2: " + req.body.confirmPass)
        if (req.body.password == req.body.confirmPass) {
            UserModel.create(user, (err, user) => {
                if (!err) {
                    console.log('user: ' + user);
                    result = { success: success, message: message }
                    res.send(result);
                } 
                else {
                    console.log('Error insertUser: ' + err);
                }
            });
        }
        else {
            result = { success: false, message: "Password do not match" }
            res.send(result);
        }
    }
    else {
        result = { success: success, message: message}
        res.send(result);
    }
}
// function insertDrink (req, res) {
//     var drink = new Drink();
//     drink._id = new mongoose.Types.ObjectId(),
//     drink.name = "Caffe Latte";
//     drink.picture = "/images/drinks/espresso/caffe-latte.png";
//     drink.category = "Espresso";
//     var prices = new Prices({
//         tall: 170,
//         grande: 180,
//         venti: 200
//     });
//     drink.pricelist = prices;

//         drink.save((err, doc) => {
//             if (!err) {
//                 // console.log('user: ' + user);
//                 prices.save((err, doc) => {
//                     if (!err) {
//                         console.log("pricelist created!");
//                     }
//                     else {
//                         console.log('Error pricelist: ' + err);
//                     }
//                 })
//                 console.log("drink inserted! " + drink);
//                 // result = { success: success, message: message }
//                 // res.send(result);
//             } 
//             else {
//                 console.log('Error insertDrink: ' + err);
//             }
//         });
// }

// function insertOrder (req, res){
//     var order = new Order();
//     var customerId, cartId;

//     Cart.findOne({_id:"5e840fa71c9d440000e1b6ba"})
//     .exec()
//     .then(function(cart){
//         cartId = cart._id;
//         console.log("cartId: " +cartId);
        
//         User.findOne({fullname: "Frances Lopez"})
//         .exec()
//         .then(function(user){
//             customerId = user._id;
//             console.log("customerId: " +customerId);

//             order._id = new mongoose.Types.ObjectId(),
//             order.customer = customerId;
//             order.cart = cartId;
//             order.status = "Received";
//             order.date;
//             order.totalprice = cart.totalprice;

//             order.save((err, doc) => {
//                 if (!err) {
//                     console.log("order inserted! " +order);
//                 }
//                 else {
//                     console.log("error inserting order: " +err);
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });   
// }