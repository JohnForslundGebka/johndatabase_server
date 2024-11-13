// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

// Define route to get all products
router.get('/', productController.getAllProducts);

module.exports = router;
