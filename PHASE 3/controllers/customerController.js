const mongoose = require('mongoose');

const UserModel = require('../models/user');
const CartModel = require('../models/cart');
const DrinkModel = require('../models/drink')
const DrinkOrderModel = require('../models/drinkorder')
const OrderModel = require('../models/order')

const DrinkOrder = mongoose.model('DrinkOrder')
const Cart = mongoose.model('Cart');
const Order = mongoose.model('Order')

exports.getHomepage = (req, res) => {
    // insertFavorite(req, res);
    UserModel.getUser({_id: req.session.user}, function(err, user) {
        DrinkModel.getNewlyAdded(function(drinks) {
            res.render('homepage', {
                user: user,
                title: 'Home - Starbucks Assist', 
                layout: 'home', 
                loc: 'Home',
                loggedIn: true,
                css: ['header-footer.css', 'content-home.css'],
                drinks: drinks
            })
        })
    });
};

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
                                // req.session.isAdmin = true;
                                req.session.cart = mongoose.Types.ObjectId(cart._id).toString()
                                console.log(req.session);
                                req.session.save((err) => {
                                    if(!err) {
                                        console.log("req sess here: " + req.session);
                                    }
                                });
                                
                                console.log("successful creating cart");
                            }
                        })
                    }
                    else {
                        CartModel.addDrink(req.session.cart, drinkorder, (err, cart) => {
                            if (err)
                                console.log("error in cart: " + err)
                            else {
                                console.log(req.session);
                                req.session.save((err) => {
                                    if(!err) {
                                        console.log("req sess here: " + req.session);
                                    }
                                });
                                
                                console.log("successful adding to cart");
                            }
                        })
                    }
                }
                    
            })
        })
    })
};

exports.updateQuant = (req, res) => {
    DrinkOrderModel.updateQuantity(req.body.id, req.body.quant, req.body.price, function(err, drinkorder) {
        CartModel.updateTotal(req.session.cart, function(err, cart) {
            if (!err) {
                console.log("quant and total updated! " +drinkorder);
            } else {
                console.log("err in updating quant and total: " + err);
            }
        })
    });
}

exports.updateRequest = (req, res) => {
    DrinkOrderModel.updateRequest(req.body.id, req.body.request, function(err, drinkorder) {
        if (!err) {
            console.log("request updated! " + drinkorder);
        } else {
            console.log("err in updating request: " + err);
        }
    });
}

exports.deleteDrink = (req, res) => {
    CartModel.deleteDrink(req.session.cart, req.body.id, req.body.total, function(err, cart) {
        DrinkOrderModel.deleteDrink(req.body.id, function(err, drinkorder) {
            if (!err) {
                console.log("deleted! " + drinkorder);
            } else {
                console.log("err in deleting: " + err);
            }
            res.redirect('/customer/cart')
        });
    })
        
}

exports.getCart = (req, res) => {
    console.log(req.session);
    if (req.session.cart != null) {
        CartModel.getCart({_id: req.session.cart}, function(err, cart, quant) {
            OrderModel.countOrders(function(err, ordernum) {
                UserModel.getUser({_id: req.session.user}, function(err, user) {
                    res.render('cart-customer',  {
                        title: 'My Cart - Starbucks Assist', 
                        layout: 'home', 
                        loc: 'View Cart',
                        isAdmin: false,
                        loggedIn: true,
                        css: ['header-footer.css', 'content-cart.css'],
                        js: 'cart.js',
                        cart: cart,
                        noItems: quant,
                        drinkorder: cart.drinks,
                        drink: cart.drinks.drink,
                        user: user,
                        ordernum: ordernum
                    });
                }) 
            })
        });
    } else {
        UserModel.getUser({_id: req.session.user}, function(err, user) {
            res.render('cart-customer',  {
                title: 'My Cart - Starbucks Assist', 
                layout: 'home', 
                loc: 'View Cart',
                isAdmin: false,
                loggedIn: true,
                css: ['header-footer.css', 'content-cart.css'],
                js: 'cart.js',
                user: user
            });
        }) 
    }
}

exports.checkout = function (req, res) {
    OrderModel.countOrders(function(err, num) {
        var order = new Order();
        order._id = new mongoose.Types.ObjectId();
        order.ordernum = num;
        order.customer = req.session.user;
        order.cart = req.session.cart;
        order.status = "Received";

        OrderModel.create(order, function(err, order) {
            if (!err) {
                console.log("order inserted");
                req.session.cart = null;
                req.session.save((err) => {
                    if(!err) {
                        console.log("req sess here: " + req.session);
                    }
                });
            } else {
                console.log("inserting order err: " + err);
            }
        })
    })
    res.redirect('/customer/order-status')
}

exports.getUserDetails = (req, res) => {
    UserModel.getUser({_id: req.session.user}, function(err, user) {
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
    UserModel.getUser({_id: req.session.user}, function(err, user) {
        OrderModel.getOrderHistory({customer: user._id}, function(orders) {
            res.render('order-status-customer',  {
                title: 'Order Status - Starbucks Assist', 
                layout: 'home', 
                loc: 'Order Status',
                isAdmin: false,
                loggedIn: true,
                css: ['header-footer.css', 'content-status.css'],
                user: user,
                orders: orders
            });
        })
    }) 
}

exports.getFavorites = (req, res) => {
    UserModel.getUser({_id: req.session.user}, function(err, user) {
        UserModel.getFavorites({_id: req.session.user}, function(err, favorites) {
            res.render('my-favorites',  {
                title: 'My Favorites - Starbucks Assist', 
                layout: 'home', 
                isAdmin: false,
                loggedIn: true,
                css: ['header-footer.css', 'content-my-favorites.css'],
                js: 'favorites.js',
                favorites: favorites,
                user: user    
            });
        })
    }) 
}

exports.getTransactionHistory = (req, res) => {
    UserModel.getUser({_id: req.session.user}, function(err, user) {
        OrderModel.getOrderHistory({customer: user._id}, function(orders) {
            res.render('transaction-history',  {
                title: 'Transaction History - Starbucks Assist', 
                layout: 'home', 
                isAdmin: false,
                loggedIn: true,
                css: ['header-footer.css', 'transaction-history.css'],
                user: user.toObject(),
                orders: orders
            });
        })
    }) 
}

exports.logoutUser = (req, res) => {
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
      });
    }
};