const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const customerRouter = require("./customerRoute");
const adminRouter = require("./adminRoute");

const indexController = require('../controllers/indexController')

const { isPublic } = require('../middlewares/checkAuth');

// Home route
router.get('/', isPublic, indexController.getHomepage);

//Register and Login
router.get('/register', isPublic, indexController.registerView);
router.post('/addUser', indexController.registerProcess);
router.post('/login', indexController.login);

//Customer Route
router.use('/customer', customerRouter);

//Admin Route
router.use('/admin', adminRouter);

module.exports = router;