const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');

const customerController = require('../controllers/customerController');
const cartController = require('../controllers/cartController');

const menuRouter = require("./menuRoute");

router.get('/home', customerController.getHomepage);

router.get('/cart', customerController.getCart);

router.post('/addToCart', cartController.addDrinkOrder);

router.get('/account-settings', customerController.getUserDetails);

router.get('/order-status', customerController.getOrderStatus);

router.get('/favorites', customerController.getFavorites);

router.get('/transaction-history', customerController.getTransactionHistory);


router.use('/menu', menuRouter);

module.exports = router;