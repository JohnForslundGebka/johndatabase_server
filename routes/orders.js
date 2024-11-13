const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Sets upp al the routes that will be used in /orders
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/', orderController.getAllOrders);

module.exports = router;