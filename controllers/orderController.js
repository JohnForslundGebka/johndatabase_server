const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { products } = req.body; // get info from the request

    // Check for an empty products array
  if (!products || products.length === 0) {
    return res.status(400).json({ error: 'No products in the order' });
  }
  
  //se if connection is good
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: 'Transaction start failed' });

    const order_id = createUUID();

    const query = 'INSERT INTO orders (order_id, product_id, quantity) VALUES (?, ?, ?)';

    products.array.forEach(product => {
        const { productId, quantity } = product;
        
        db.query(query, [order_id, productId, quantity], (err) =>
        {
            if (err) {
          // If an error occurs, rollback the transaction
          return db.rollback(() => res.status(500).json({ error: 'Transaction failed' }));
        }
        })
    });
     // Commit the transaction if all inserts succeed
    db.commit((err) => {
      if (err) {
        return db.rollback(() => res.status(500).json({ error: 'Transaction failed' }));
      }
      res.status(201).json({ message: 'Order created successfully', order_id });
    });

  });
};

exports.getOrderById = (req, res) => {

};

exports.getAllOrders = (req, res) => {

};

function createUUID (){
    const uuid = Crypto.createUUID();
    return uuid;
}