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

exports.steekGebruikerInProject = (req, res) => {
  const { uid, pid, adminid, pw } = req.params;

  // Validate the input
  if (!uid || !pid || !adminid || !pw) {
    return res.status(400).send("All fields are required");
  }

  // Check if the admin credentials are valid
  const checkAdminQuery =
    "SELECT * FROM Gebruiker WHERE id = ? AND wachtwoord = ? AND niveau = 3";
  db.query(checkAdminQuery, [adminid, pw], (err, results) => {
    if (err) {
      console.error("Error checking admin credentials:", err);
      res.status(500).send("Error checking admin credentials");
      return;
    }

    if (results.length === 0) {
      return res.status(403).send("Unauthorized: Invalid admin credentials");
    }

    // Update the project ID of the gebruiker
    const updateQuery = "UPDATE Gebruiker SET projectId = ? WHERE id = ?";
    db.query(
      updateQuery,
      [pid === "-1" ? null : pid, uid],
      (err, updateResults) => {
        if (err) {
          console.error("Error updating gebruiker project ID:", err);
          res.status(500).send("Error updating gebruiker project ID");
          return;
        }
        res.status(200).send("Gebruiker project ID updated successfully");
      }
    );
  });
};
