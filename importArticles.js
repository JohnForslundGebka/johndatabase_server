// importArticles.js
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Database connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

// Read and parse the JSON file
const filePath = path.join(__dirname, 'data', 'industrial.json'); //filepath for .json file

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;

  const articles = JSON.parse(data);

  articles.forEach((article) => {
    const { name, articleNumber, price, description } = article;
    
    const query = 'INSERT INTO products (name, articleNumber, price, description) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, articleNumber, price, description], (err, results) => {
      if (err) {
        console.error(`Error inserting article ${name}:`, err.message);
        return;
      }
      console.log(`Inserted article: ${name}`);
    });
  });

  // Close the database connection
  db.end(() => {
    console.log('Database connection closed.');
  });
});
