const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: 'No products in the order' });
  }

  db.beginTransaction((err) => {
    if (err) {
      console.error('Transaction start error:', err);
      return res.status(500).json({ error: 'Transaction start failed' });
    }

    const order_id = createUUID();
    const query = 'INSERT INTO orders (order_id, product_id, quantity) VALUES (?, ?, ?)';
    let completedInserts = 0;
    const totalInserts = products.length;
    let hasErrorOccurred = false; // Flag to prevent multiple responses

    products.forEach((product) => {
      const { productId, quantity } = product;

      db.query(query, [order_id, productId, quantity], (err) => {
        if (err) {
          console.error('Error inserting product:', product, 'Error:', err);
          if (!hasErrorOccurred) {
            hasErrorOccurred = true; // Set flag to true to avoid additional responses
            return db.rollback(() => res.status(500).json({ error: 'Transaction failed' }));
          }
          return; // Exit early if error is already handled
        }

        completedInserts++;

        if (completedInserts === totalInserts && !hasErrorOccurred) {
          db.commit((err) => {
            if (err) {
              console.error('Transaction commit error:', err);
              if (!hasErrorOccurred) {
                hasErrorOccurred = true;
                return db.rollback(() => res.status(500).json({ error: 'Transaction commit failed' }));
              }
              return;
            }
            // Only send response once after a successful commit
            res.status(201).json({ message: 'Order created successfully', order_id });
          });
        }
      });
    });
  });
};


exports.getOrderById = (req, res) => {
  const orderID = req.params.id;

  if (!orderID) {
    // If no order ID is provided, respond immediately
    return res.status(400).json({ error: 'No order ID detected' });
  }

  const query = `
    SELECT 
      orders.order_id,
      orders.quantity,
      products.id AS product_id,
      products.name,
      products.articleNumber,
      products.price,
      products.description
    FROM 
      orders
    JOIN 
      products ON orders.product_id = products.id
    WHERE 
      orders.order_id = ?;
  `;

  db.query(query, [orderID], (err, results) => {
    if (err) {
      // Log the error and send a single error response
      console.error('Database query error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      // If no results are found, send a 404 response and return early
      return res.status(404).json({ error: 'Order not found' });
    }

    // Structure the response object
    const orderDetails = {
      orderId: results[0].order_id,
      products: results.map(row => ({
        productId: row.product_id,
        name: row.name,
        articleNumber: row.articleNumber,
        price: row.price,
        description: row.description,
        quantity: row.quantity
      }))
    };

    // Send the response with order details
    res.json(orderDetails);
  });
};

exports.getAllOrders = (req, res) => {

};

function createUUID (){
    return crypto.randomUUID();
}