const db = require("../db");

exports.getGebruikers = (req, res) => {
  const query = "SELECT * FROM Gebruiker";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching gebruikers:", err);
      res.status(500).send("Error fetching gebruikers");
      return;
    }
    res.json(results);
  });
};

exports.getGebruikerById = (req, res) => {
  const gebruikerId = req.params.id;
  const query = "SELECT * FROM Gebruiker WHERE id = ?";
  db.query(query, [gebruikerId], (err, results) => {
    if (err) {
      console.error("Error fetching gebruiker:", err);
      res.status(500).send("Error fetching gebruiker");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Gebruiker not found");
      return;
    }
    res.json(results[0]);
  });
};

exports.createGebruiker = (req, res) => {
  const { voornaam, achternaam, email, niveau, projectId, wachtwoord } =
    req.body;
  const query =
    "INSERT INTO Gebruiker (voornaam, achternaam, email, niveau, projectId, wachtwoord) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [voornaam, achternaam, email, niveau, projectId, wachtwoord],
    (err, results) => {
      if (err) {
        console.error("Error creating gebruiker:", err);
        res.status(500).send("Error creating gebruiker");
        return;
      }
      res.status(201).send("Gebruiker created successfully");
    }
  );
};

exports.updateGebruiker = (req, res) => {
  const gebruikerId = req.params.id;
  const { voornaam, achternaam, email, niveau, projectId, wachtwoord } =
    req.body;
  const query =
    "UPDATE Gebruiker SET voornaam = ?, achternaam = ?, email = ?, niveau = ?, projectId = ?, wachtwoord = ? WHERE id = ?";
  db.query(
    query,
    [voornaam, achternaam, email, niveau, projectId, wachtwoord, gebruikerId],
    (err, results) => {
      if (err) {
        console.error("Error updating gebruiker:", err);
        res.status(500).send("Error updating gebruiker");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Gebruiker not found");
        return;
      }
      res.send("Gebruiker updated successfully");
    }
  );
};

exports.deleteGebruiker = (req, res) => {
  const gebruikerId = req.params.id;
  const query = "DELETE FROM Gebruiker WHERE id = ?";
  db.query(query, [gebruikerId], (err, results) => {
    if (err) {
      console.error("Error deleting gebruiker:", err);
      res.status(500).send("Error deleting gebruiker");
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send("Gebruiker not found");
      return;
    }
    res.send("Gebruiker deleted successfully");
  });
};
