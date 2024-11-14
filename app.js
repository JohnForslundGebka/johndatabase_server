const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Parses incoming JSON requests

// Routes
const orderRoutes = require('./routes/orders')
app.use('/api/orders', orderRoutes); // Sets order-related routes at /api/orders

const productsRoutes = require('./routes/products')
app.use('/api/products', productsRoutes);

module.exports = app;
