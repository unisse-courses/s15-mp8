const router = require('express').Router();

const menuController = require('../controllers/menuController');

router.get('/order/:category', menuController.getDrinksForOrder);
router.get('/update/:category', menuController.getDrinksForUpdate);


module.exports = router;