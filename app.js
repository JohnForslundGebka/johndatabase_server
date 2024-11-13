const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Parses incoming JSON requests

// Routes
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes); // Mounts order-related routes at /api/orders

module.exports = app;
