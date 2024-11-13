// controllers/productController.js
const db = require('../config/db');

// Function to get all products
exports.getAllProducts = (req, res) => {
  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Failed to retrieve products' });
    }

    // Send the list of products as JSON
    res.status(200).json(results);
  });
};