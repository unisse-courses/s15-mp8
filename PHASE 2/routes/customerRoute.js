const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');
const User = mongoose.model('User');

const menuRouter = require("./menuRoute");

router.get('/home', (req, res) => {
    User.findOne().sort({$natural: -1}).limit(1).exec((err, docs) => {
        if(!err) {
            res.render('homepage', {
                user: docs,
                title: 'Home - Starbucks Assist', 
                layout: 'home', 
                loc: 'Home',
                loggedIn: true,
                css: ['header-footer.css', 'content-home.css']
            })
        } else {
            console.log('Error in user: ' + err);
        }
    });
});

router.get('/cart', (req, res) => {
    res.render('cart-customer',  {
        title: 'My Cart - Starbucks Assist', 
        layout: 'home', 
        loc: 'View Cart',
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'content-cart.css'] });
});

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
        css: ['header-footer.css', 'content-my-favorites.css'] });
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