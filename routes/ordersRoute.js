const router = require('express').Router();

const orderController = require('../controllers/orderController')

router.get('/:status', orderController.getOrderStatus);

router.post('/update', orderController.updateStatus)

module.exports = router;