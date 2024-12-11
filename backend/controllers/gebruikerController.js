const db = require("../db");

exports.getStudenten = (req, res) => {
  const projectId = req.params.projectId;
  const query = "SELECT * FROM Gebruiker WHERE projectId = ? AND niveau = 2";
  db.query(query, [projectId], (err, results) => {
    if (err) {
      console.error("Error fetching studenten:", err);
      res.status(500).send("Error fetching studenten");
      return;
    }
    res.json(results);
  });
};

exports.getCoach = (req, res) => {
  const projectId = req.params.projectId;
  const query = "SELECT * FROM Gebruiker WHERE projectId = ? AND niveau = 1";
  db.query(query, [projectId], (err, results) => {
    if (err) {
      console.error("Error fetching coach:", err);
      res.status(500).send("Error fetching coach");
      return;
    }
    res.json(results);
  });
};
