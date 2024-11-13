const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

//set up the connectiong to the local DB
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

