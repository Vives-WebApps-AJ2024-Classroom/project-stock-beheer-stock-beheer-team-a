const db = require("../db");

exports.getWinkels = (req, res) => {
  const query = "SELECT * FROM Winkel";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching winkels:", err);
      res.status(500).send("Error fetching winkels");
      return;
    }
    res.json(results);
  });
};

exports.maakWinkel = (req, res) => {
  const { naam, specializatie, uid, pw } = req.params;
  const { url } = req.body;

  // Validate the input
  if (!naam || !specializatie || !uid || !pw || !url) {
    return res.status(400).send("All fields are required");
  }

  const query =
    "INSERT INTO Winkel (naam, url, specializatie) VALUES (?, ?, ?)";
  db.query(query, [naam, url, specializatie], (err, results) => {
    if (err) {
      console.error("Error creating winkel:", err);
      res.status(500).send("Error creating winkel");
      return;
    }
    res.status(201).send("Winkel created successfully");
  });
};
