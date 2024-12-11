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
