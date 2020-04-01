const User = require('../models/user');
const Cart = require('../models/cart');

exports.getUser = (req, res) => {
    User.getAllUsers({_id: 1}, function (user) {
        res.render('homepage', {
            user: user,
            title: 'Home - Starbucks Assist', 
            layout: 'home', 
            loc: 'Home',
            loggedIn: true,
            css: ['header-footer.css', 'content-home.css']
        })
    });
};

exports.getCart = (req, res) => {
    Cart.getCart({_id: "5e840fa71c9d440000e1b6ba"}, function(cart) {
        res.render('cart-customer',  {
            title: 'My Cart - Starbucks Assist', 
            layout: 'home', 
            loc: 'View Cart',
            isAdmin: false,
            loggedIn: true,
            css: ['header-footer.css', 'content-cart.css'],
            cart: cart,
            drinkorder: cart.drinks,
            drink: cart.drinks.drink
        })
    });
}