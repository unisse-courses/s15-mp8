const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');

const customerController = require('../controllers/customerController');
const cartController = require('../controllers/cartController');

const menuRouter = require("./menuRoute");

const { isPrivate } = require('../middlewares/checkAuth');

router.get('/home', isPrivate, customerController.getHomepage);

router.get('/cart', isPrivate, customerController.getCart);

router.post('/addToCart', cartController.addDrinkOrder);

router.get('/account-settings', isPrivate, customerController.getUserDetails);

router.get('/order-status', isPrivate, customerController.getOrderStatus);

router.get('/favorites', isPrivate, customerController.getFavorites);

router.get('/transaction-history', isPrivate, customerController.getTransactionHistory);

router.get('/logout', isPrivate, customerController.logoutUser)

router.use('/menu', menuRouter);

module.exports = router;