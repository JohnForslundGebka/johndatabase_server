const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json()); // Parses incoming JSON requests

app.use(cors({
  origin: 'http://127.0.0.1:5501' // Allow only this specific origin
}));

app.use(express.static('public'));

// Routes
const orderRoutes = require('./routes/orders')
app.use('/api/orders', orderRoutes); // Sets order-related routes at /api/orders

const productsRoutes = require('./routes/products')
app.use('/api/products', productsRoutes);

module.exports = app;
