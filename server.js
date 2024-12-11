// Verander van require naar import
import express from 'express';   // Importeer express
import mysql from 'mysql2';      // Importeer mysql2
import cors from 'cors';         // Importeer cors
import dotenv from 'dotenv';     // Importeer dotenv
dotenv.config();                // Laad de omgevingsvariabelen uit .env bestand

const app = express();
const port = 3000;

// Gebruik CORS
app.use(cors());

// Gebruik express om JSON data te kunnen verwerken
app.use(express.json());

// Database verbinding
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Verbind met de database
db.connect((err) => {
  if (err) {
    console.error('Fout bij het verbinden met de database: ', err);
  } else {
    console.log('Verbonden met de database');
  }
});

// Endpoint om gebruikers op te slaan
app.post('/gebruikers', (req, res) => {
  const { rol_id, naam, voornaam, emailadres, wachtwoord } = req.body;
  const query = "INSERT INTO gebruikers (rol_id, naam, voornaam, emailadres, wachtwoord) VALUES (?, ?, ?, ?, ?)";
db.query(query, [rol_id, naam, voornaam, emailadres, wachtwoord], (err, result) => {
  if (err) {
    console.error("Databasefout:", err);
    return res.status(500).json({ message: "Er is een fout opgetreden bij het opslaan van de gebruiker", error: err });
  }
  res.status(201).json({ message: "Gebruiker succesvol toegevoegd!" });
});
});

// Start de server
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
