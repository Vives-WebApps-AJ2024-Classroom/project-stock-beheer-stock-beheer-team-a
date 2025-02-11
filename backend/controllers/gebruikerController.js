const db = require("../db");
const log = require("./logController")


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

exports.getGebruikerByEmail = (req, res) => {
  const email = req.query.email;
  const query = "SELECT * FROM Gebruiker WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching gebruiker by email:", err);
      res.status(500).send("Error fetching gebruiker by email");
      return;
    }
    if (results.length === 0) {
      res.json({ exists: false});
      return;
    }
    res.json({ exists: true, gebruiker: results[0] }); // Gebruik JSON met exists: true
  });
};

exports.createGebruiker = (req, res) => {
  const { naam, achternaam, rol, email, wachtwoord } = req.body; // Haal data uit req.body

  const query =
    "INSERT INTO Gebruiker (voornaam, achternaam, email, niveau, wachtwoord) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [naam, achternaam, email, rol, wachtwoord], (err, results) => {
    if (err) {
      console.error("Error creating gebruiker:", err);
      res.status(500).send("Error creating gebruiker");
      return;
    }

    const gebruikerId = results.insertId;
    const selectQuery = "SELECT * FROM Gebruiker WHERE id = ?";
    db.query(selectQuery, [gebruikerId], (err, selectResults) => {
      if (err) {
        console.error("Error fetching created gebruiker:", err);
        res.status(500).send("Error fetching created gebruiker");
        return;
      }
      res.status(201).json(selectResults[0]);
    });
  });
};


exports.updateGebruiker = (req, res) => {
  const { id, naam, achternaam, rol, email, wachtwoord, adminid, adminpw } =
    req.params;

  // Validate the input
  if (!id || !adminid || !adminpw) {
    return res
      .status(400)
      .send("ID, admin ID, and admin password are required");
  }

  // Check if the admin credentials are valid
  const checkAdminQuery =
    "SELECT * FROM Gebruiker WHERE id = ? AND wachtwoord = ? AND niveau = 0";
  db.query(checkAdminQuery, [adminid, adminpw], (err, results) => {
    if (err) {
      console.error("Error checking admin credentials:", err);
      res.status(500).send("Error checking admin credentials");
      return;
    }

    if (results.length === 0) {
      return res.status(403).send("Unauthorized: Invalid admin credentials");
    }

    // Update the gebruiker
    const updateFields = [];
    const updateValues = [];

    if (naam !== "-1") {
      updateFields.push("voornaam = ?");
      updateValues.push(naam);
    }
    if (achternaam !== "-1") {
      updateFields.push("achternaam = ?");
      updateValues.push(achternaam);
    }
    if (rol !== "-1") {
      updateFields.push("niveau = ?");
      updateValues.push(rol);
    }
    if (email !== "-1") {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (wachtwoord !== "-1") {
      updateFields.push("wachtwoord = ?");
      updateValues.push(wachtwoord);
    }

    if (updateFields.length === 0) {
      return res.status(400).send("No fields to update");
    }

    updateValues.push(id);
    const updateQuery = `UPDATE Gebruiker SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;
    let exe = db.query(updateQuery, updateValues, (err, updateResults) => {
      if (err) {
        console.error("Error updating gebruiker:", err);
        res.status(500).send("Error updating gebruiker");
        return;
      }
      res.status(200).send("Gebruiker updated successfully");
      log.logQuery(exe.sql, adminid,0,0)
    });
  });
};

exports.deleteGebruiker = (req, res) => {
  const { id, adminid, adminpw } = req.params;

  // Validate the input
  if (!id || !adminid || !adminpw) {
    return res
      .status(400)
      .send("ID, admin ID, and admin password are required");
  }

  // Check if the admin credentials are valid
  const checkAdminQuery =
    "SELECT * FROM Gebruiker WHERE id = ? AND wachtwoord = ? AND niveau = 0";
  db.query(checkAdminQuery, [adminid, adminpw], (err, results) => {
    if (err) {
      console.error("Error checking admin credentials:", err);
      res.status(500).send("Error checking admin credentials");
      return;
    }

    if (results.length === 0) {
      return res.status(403).send("Unauthorized: Invalid admin credentials");
    }

    // Delete the gebruiker
    const deleteQuery = "DELETE FROM Gebruiker WHERE id = ?";
    let exe = db.query(deleteQuery, [id], (err, deleteResults) => {
      if (err) {
        console.error("Error deleting gebruiker:", err);
        res.status(500).send("Error deleting gebruiker");
        return;
      }
      res.status(200).send("Gebruiker deleted successfully");
      log.logQuery(exe.sql, adminid,0,0)
    });
  });
};
