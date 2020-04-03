const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');
const User = mongoose.model('User');

const indexController = require('../controllers/indexController')

// Home route
router.get('/', indexController.getHomepage);

module.exports = router;