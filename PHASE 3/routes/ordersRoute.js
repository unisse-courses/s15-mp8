const router = require('express').Router();

const orderController = require('../controllers/orderController')

router.get('/:status', orderController.getOrderStatus);

module.exports = router;