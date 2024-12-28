const mysql = require("mysql2");
const dotenv = require('dotenv')

dotenv.config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, // local MySQL password
  database: process.env.DB_DTBS, // local MySQL database
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;
