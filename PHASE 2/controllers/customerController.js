const mongoose = require('mongoose');

const UserModel = require('../models/user');
const CartModel = require('../models/cart');
const FavoriteModel = require('../models/favorite');
const OrderModel = require('../models/order')

const Favorite = mongoose.model('Favorite');
const User = mongoose.model('User');
const Drink = mongoose.model('Drink');

exports.getUser = (req, res) => {
    // insertFavorite(req, res);
    UserModel.getUser({fullname: "Frances Lopez"}, function(user) {
        res.render('homepage', {
            user: user,
            title: 'Home - Starbucks Assist', 
            layout: 'home', 
            loc: 'Home',
            loggedIn: true,
            css: ['header-footer.css', 'content-home.css'],
            user: user
        })
    });
};

exports.getCart = (req, res) => {
    CartModel.getCart({_id: "5e840fa71c9d440000e1b6ba"}, function(cart) {
        UserModel.getUser({fullname: "Frances Lopez"}, function(user) {
            res.render('cart-customer',  {
                title: 'My Cart - Starbucks Assist', 
                layout: 'home', 
                loc: 'View Cart',
                isAdmin: false,
                loggedIn: true,
                css: ['header-footer.css', 'content-cart.css'],
                cart: cart,
                drinkorder: cart.drinks,
                drink: cart.drinks.drink,
                user: user
            });
        }) 
    });
}

exports.getUserDetails = (req, res) => {
    UserModel.getUser({fullname: "Frances Lopez"}, function(user) {
        res.render('acc-settings',  {
            title: 'Account Settings - Starbucks Assist', 
            layout: 'home', 
            isAdmin: false,
            loggedIn: true,
            css: ['header-footer.css', 'acct_settings.css'], 
            user: user
        });
    }) 
}

exports.getOrderStatus = (req, res) => {
    UserModel.getUser({fullname: "Frances Lopez"}, function(user) {
        
        res.render('order-status-customer',  {
            title: 'Order Status - Starbucks Assist', 
            layout: 'home', 
            loc: 'Order Status',
            isAdmin: false,
            loggedIn: true,
            css: ['header-footer.css', 'content-status.css'],
            user: user
        });
    }) 
}

exports.getFavorites = (req, res) => {
    UserModel.getUser({fullname: "Frances Lopez"}, function(user) {
        FavoriteModel.getFavorites({customer: user._id}, function(favorites) {
            res.render('my-favorites',  {
                title: 'My Favorites - Starbucks Assist', 
                layout: 'home', 
                isAdmin: false,
                loggedIn: true,
                css: ['header-footer.css', 'content-my-favorites.css'],
                favorites: favorites,
                user: user       
            });
        })
    }) 
}

exports.getTransactionHistory = (req, res) => {
    UserModel.getUser({fullname: "Frances Lopez"}, function(user) {
        OrderModel.getOrderHistory({customer: user._id}, function(orders) {
            res.render('transaction-history',  {
                title: 'Transaction History - Starbucks Assist', 
                layout: 'home', 
                isAdmin: false,
                loggedIn: true,
                css: ['header-footer.css', 'transaction-history.css'],
                user: user,
                orders: orders
            });
        })
    }) 
}

function insertFavorite(req, res, success, message) {
    var favorite = new Favorite();
    var customerId, drinkId;

    User.findOne({fullname: "Frances Lopez"})
    .exec()
    .then(function(user) {
        customerId = user._id;
        Drink.findOne({name: "Caramel Macchiato"})
        .exec()
        .then(function(drink1) {
            drinkId = drink1._id;
            // favs.push(drink1._id);
            // Drink.find({name: "Cappuccino"})
            // .exec()
            // .then(function(drink2) {
            //     favs.push(drink2._id);
            //     Drink.find({name: "Caffe Latte"})
            //     .exec()
            //     .then(function(drink3) {
            //         favs.push(drink3._id);
                    favorite._id = new mongoose.Types.ObjectId();
                    favorite.customer = customerId;
                    favorite.drink = drinkId;

                    favorite.save((err, doc) => {
                        if (!err) {
                            console.log("favorite inserted! " + favorite);
                        }
                        else {
                            console.log("error inserting favorite: " +err);
                        }
                    });
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
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}