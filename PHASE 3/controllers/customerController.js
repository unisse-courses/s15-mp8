const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const UserModel = require('../models/user');
const CartModel = require('../models/cart');
const DrinkModel = require('../models/drink')
const DrinkOrderModel = require('../models/drinkorder')
const OrderModel = require('../models/order')

const User = mongoose.model('User');
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
                res.status(200).send({status: "ok"})
            } else {
                console.log("inserting order err: " + err);
            }
        })
    })
    
}

exports.getUserDetails = (req, res) => {
    UserModel.getUser({_id: req.session.user}, function(err, user) {
        res.render('acc-settings',  {
            title: 'Account Settings - Starbucks Assist', 
            layout: 'home', 
            isAdmin: false,
            loggedIn: true,
            css: ['header-footer.css', 'acct_settings.css'], 
            js: 'acct-settings.js',
            user: user
        });
    }) 
};

exports.updateUser = function (req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        console.log("theres no error");
        const { fullname, nickname, email, phone, pass1, pass2 } = req.body;
        
        console.log(fullname, nickname, email, phone, pass1, pass2);

        
        const saltRounds = 10;

        // Hash password
        bcrypt.hash(pass1, saltRounds, (err, hashed) => {
            const updateduser = new User();
            
            updateduser.fullname = fullname;
            updateduser.nickname = nickname;
            updateduser.emailAddress = email;
            updateduser.phone = phone;
            updateduser.password = hashed;
            
            if(req.file != undefined) {
                var tempPic = req.file.path;
                updateduser.displayphoto = tempPic.substring(22, tempPic.length);
            }
            
            
            console.log ("before saving: " + updateduser);

            UserModel.updateUser(req.session.user, updateduser, function(err, user, existing) {
                if(err)
                    console.log("error in updating user: " + err);
                else {
                    if(existing) {
                        //email taken
                        req.flash('error_msg', 'Email address already taken.');
                        res.redirect('/customer/account-settings');
                    } else {
                        console.log("user updated");
                        res.redirect('/customer/account-settings');
                    }
                    
                }
            })
            
        });
        
    } else {
        console.log("theres an error");

        const messages = errors.array().map((item) => item.msg);

        req.flash('error_msg', messages.join(' '));
        res.redirect('/customer/account-settings');
    }
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
            DrinkModel.getAllDrinkByCategory(function (err, drinks, drinkCount) {
                res.render('my-favorites',  {
                    title: 'My Favorites - Starbucks Assist', 
                    layout: 'home', 
                    isAdmin: false,
                    loggedIn: true,
                    css: ['header-footer.css', 'content-my-favorites.css'],
                    js: 'favorites.js',
                    favorites: favorites,
                    user: user,
                    drinks: drinks,
                    drinkCount: drinkCount
                });
            }) 
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
                user: user,
                orders: orders
            });
        })
    }) 
}

exports.addToFavorites = function (req, res) {
    // console.log("Your favorite is " + req.body.drinks); 
    DrinkModel.getDrink({name: req.body.drink}, function(err, drink) {
        UserModel.addToFavorites(req.session.user, drink, function(err, user, check) {
            if(check) {
                res.status(200).send({status: "exist"});
                console.log("check true")
            }
            else {
                console.log("check false")
                if (!err) {
                    console.log("favorite added");
                    res.status(200).send({status: "ok"});
                } else {
                    console.log("error in adding fav: " + err);
                }
            }
        })
    })
}

exports.deleteFavorite = function (req, res) {
    console.log("req, body" + req.body.drinkname);
    DrinkModel.getDrink({name: req.body.drinkname}, function(err, drink) {
        UserModel.deleteFavorite(req.session.user, drink, function(err, user) {
            if (!err) {
                console.log("favorite deleted");
                res.status(200).send({status: "ok"})
            } else {
                console.log("error in deleting fav: " + err);
            }
                
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