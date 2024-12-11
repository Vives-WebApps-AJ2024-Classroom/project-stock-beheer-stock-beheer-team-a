const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "stock",
  password: "stock", // local MySQL password
  database: "stock-beheer", // local MySQL database
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;
