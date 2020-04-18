const User = require('../models/user');
const Drink = require('../models/drink');
const DrinkOrder = require('../models/drinkorder');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.addDrinkOrder = (req, res) => {
    var drinkorder;
    
    /*  finds the drink thens adds it to the drinkOrder;
        finds user id then adds drinkOrder and user to 
        cart schema.
    */

    // Drink.findOne({name: req.body.drinkname})
    // .exec()
    // .then(drink => {
    //     if (drink == null) {
    //         console.log( "drink not found to add to drinkOrder");
    //         result = {success: false}
    //         res.send(result);
    //     } else {
    //         drinkorder = insertDrinkOrder(req, res);
    //         insertCart(req, res, drinkorder);
    //     }
    // });
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