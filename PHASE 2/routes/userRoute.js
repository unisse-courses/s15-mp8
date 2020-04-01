//Require
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const Drink = mongoose.model('Drink');
// const Prices = mongoose.model('Prices');
// const Cart = mongoose.model('Cart');
// const DrinkOrder = mongoose.model('DrinkOrder');

const customerRouter = require("./customerRoute");
const adminRouter = require("./adminRoute");

const userController = require('../controllers/userController');

var router = express.Router();
mongoose.set('useFindAndModify', false);

router.get('/register', userController.registerView);

router.post('/addUser', userController.registerProcess);

router.post('/login', userController.login);

router.use('/customer', customerRouter);
router.use('/admin', adminRouter);

module.exports = router;