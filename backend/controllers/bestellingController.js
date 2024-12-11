const db = require("../db");

exports.getBestellingen = (req, res) => {
  const projectId = req.params.projectId;
  const query = "SELECT * FROM Bestelling WHERE projectId = ?";
  db.query(query, [projectId], (err, results) => {
    if (err) {
      console.error("Error fetching bestellingen:", err);
      res.status(500).send("Error fetching bestellingen");
      return;
    }
    res.json(results);
  });
};
