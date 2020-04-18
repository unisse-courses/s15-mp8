const UserModel = require('../models/user');
const DrinkModel = require('../models/drink');
const DrinkOrderModel = require('../models/drinkorder');
const CartModel = require('../models/cart');
const OrderModel = require('../models/order');

const mongoose = require('mongoose');
const DrinkOrder = mongoose.model('DrinkOrder');
const Cart = mongoose.model('Cart');

exports.addToCart = (req, res) => {
    UserModel.getUser({_id: req.session.user}, function(err, user) {
        DrinkModel.getDrink({name: req.body.drinkname}, function(err, drink) {
            const drinkorder = new DrinkOrder();

            drinkorder._id = new mongoose.Types.ObjectId();
            drinkorder.drink = drink._id;
            drinkorder.size = req.body.size;
            drinkorder.quantity = req.body.quantity;
            drinkorder.requests = req.body.requests;
            drinkorder.price = req.body.totalprice;

            DrinkOrderModel.create(drinkorder, (err, drinkorder) => {
                if (err)
                    console.log("error in drinkorder: " + err)
                else {
                    console.log("successful drinkorder: " + drinkorder);

                    if (req.session.cart == null) {
                        const tempcart = new Cart()

                        tempcart._id = new mongoose.Types.ObjectId();
                        tempcart.customer = user._id;
                        tempcart.drinks = drinkorder._id;
                        tempcart.totalprice = drinkorder.price;

                        CartModel.create(tempcart, (err, cart) => {
                            if (err)
                                console.log("error in cart: " + err)
                            else {
                                req.session.cart = mongoose.Types.ObjectId(cart._id).toString()
                                console.log(req.session);
                                
                                console.log("successful creating cart");
                            }
                        })
                    }
                    else {
                        //get current cart
                    }
                }
                    
            })
        })
    })
};

// function insertDrinkOrder (req, res) {
//     var drinkorder = new DrinkOrder();
//     var id;

//     Drink.findOne({name: req.body.drinkname})
//     .exec()
//     .then(function(drink) {
//         id = drink._id;
//         console.log("drink found for drink order: " + drink);
//         console.log("get id: " + id);

//         drinkorder._id = new mongoose.Types.ObjectId(),
//         drinkorder.drink = id;
//         drinkorder.size = req.body.size;
//         drinkorder.quantity = req.body.quantity;
//         drinkorder.requests = req.body.requests;
//         drinkorder.price = req.body.totalprice;

//         drinkorder.save((err, doc) => {
//             if (!err) {
//                 console.log("drinkorder inserted! " + drinkorder);
//                 return drinkorder;
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

// function insertCart (req, res, drinkorder) {
//     var cart = new Cart();
//     var drinkOrderId, customerId;

//     DrinkOrder.findOne({_id: drinkorder._id})
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

//             cart._id = ,
//             cart.customer = customerId;
//             cart.drink = drinkOrderId;
//             cart.totalprice = ;

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