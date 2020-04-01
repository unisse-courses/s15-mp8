const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');

const customerController = require('../controllers/customerController');
const cartController = require('../controllers/cartController');

const menuRouter = require("./menuRoute");

router.get('/home', customerController.getUser);

router.get('/cart', customerController.getCart);

router.post('/addToCart', cartController.addDrinkOrder);

router.get('/order-status', (req, res) => {
    res.render('order-status-customer',  {
        title: 'Order Status - Starbucks Assist', 
        layout: 'home', 
        loc: 'Order Status',
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'content-status.css'] });
});

router.get('/favorites', (req, res) => {
    res.render('my-favorites',  {
        title: 'My Favorites - Starbucks Assist', 
        layout: 'home', 
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'content-my-favorites.css'],
        favorites: [
            {
                name: "Cafee Latte",
                picture: "images/drinks/espresso/caffe-latte.png"
            },
            {
                name: "Cafee Latte",
                picture: "images/drinks/espresso/caffe-latte.png"
            },
            {
                name: "Cafee Latte",
                picture: "images/drinks/espresso/caffe-latte.png"
            },
            {
                name: "Cafee Latte",
                picture: "images/drinks/espresso/caffe-latte.png"
            }
        ]
            
        });
});

router.get('/transaction-history', (req, res) => {
    res.render('transaction-history',  {
        title: 'Transaction History - Starbucks Assist', 
        layout: 'home', 
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'transaction-history.css'] });
});

router.get('/account-settings', (req, res) => {
    res.render('acc-settings',  {
        title: 'Account Settings - Starbucks Assist', 
        layout: 'home', 
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'acct_settings.css'] });
});


router.use('/menu', menuRouter);

module.exports = router;