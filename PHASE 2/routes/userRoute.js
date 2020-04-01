//Require
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Drink = mongoose.model('Drink');
// const Prices = mongoose.model('Prices');
const Cart = mongoose.model('Cart');
const DrinkOrder = mongoose.model('DrinkOrder');

const customerRouter = require("./customerRoute");
const adminRouter = require("./adminRoute");

var router = express.Router();
mongoose.set('useFindAndModify', false);

router.get('/register', (req, res) => {
    // insertDrink(req, res);
    // insertCart(req, res);
    res.render('register',  { 
        title: 'Register - Starbucks Assist', 
        layout: 'home', 
        isRegister: true,
        js: 'register.js',
        css: ['header-footer.css', 'content-register.css'] });
});

router.post('/addUser', (req, res) => {
    console.log("pasok post route");
    var result;
    User.find({ emailAddress: req.body.emailAddress })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            console.log( "user:", user );
            result = { success: false, message: "Email already exists!" }
            insertUser(req, res, result.success, result.message);
        }
        else{   
            result = { success: true, message: "User created!" }
            insertUser(req, res, result.success, result.message);
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/login', (req,res) => {
    console.log("email: " + req.body.emailAddress + " password: " + req.body.password);

    User.findOne({emailAddress: req.body.emailAddress, password: req.body.password})
    .exec()
    .then(user => {
      if (user == null) {
            console.log( "user not found");
            result = {success: false, message: "Email or password does not match." }
            res.send(result);
        }
        else{   
            
            console.log( "user found:", user);
            result = {success: true, isAdmin: user.isAdmin};
            res.send(result);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

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
            user.save((err, doc) => {
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

// function insertDrinkOrder (req, res) {
//     var drinkorder = new DrinkOrder();
//     var id;

//     Drink.findOne({name: "Cappuccino"})
//     .exec()
//     .then(function(drink) {
//         id = drink._id;
//         console.log("drink found for drink order: " + drink);
//         console.log("get id: " + id);

//         drinkorder._id = new mongoose.Types.ObjectId(),
//         drinkorder.drink = id;
//         drinkorder.size = "Grande";
//         drinkorder.quantity = 3;
//         drinkorder.requests = "n/a";

//         drinkorder.save((err, doc) => {
//             if (!err) {
//                 console.log("drinkorder inserted! " + drink);
//                 // result = { success: success, message: message }
//                 // res.send(result);
//             } 
//             else {
//                 console.log('Error insertDrinkOrder: ' + err);
//             }
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
// }

// function insertCart (req, res) {
//     var cart = new Cart();
//     var drinkOrderId, customerId;

//     DrinkOrder.findOne({_id: "5e838a2ffaebc04684997887"})
//     .exec()
//     .then(function(drinkorder) {
//         drinkOrderId = drinkorder._id;
//         console.log("drink found for drink order: " + drinkorder);
//         console.log("get id: " + drinkOrderId);
        
//         User.findOne({fullname: "Ainsley Go"})
//         .exec()
//         .then(function(user) {

//             customerId = user._id;
//             console.log("drink found for drink order: " + user);
//             console.log("get id: " + customerId);

//             cart._id = new mongoose.Types.ObjectId(),
//             cart.customer = customerId;
//             cart.drink = drinkOrderId;
//             cart.totalprice = 510;

//             cart.save((err, doc) => {
//                 if (!err) {
//                     console.log("cart inserted! " + cart);
//                     // result = { success: success, message: message }
//                     // res.send(result);
//                 } 
//                 else {
//                     console.log('Error insertcart: ' + err);
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

router.use('/customer', customerRouter);
router.use('/admin', adminRouter);

module.exports = router;