const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');

const menuRouter = require("./menuRoute");
const ordersRouter = require("./ordersRoute");

const adminController = require('../controllers/adminController')

router.get('/home', adminController.getHomepage);

router.use('/orders', ordersRouter);
router.use('/menu', menuRouter);

module.exports = router;