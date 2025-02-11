const db = require("../db");
const log = require("./logController")

exports.maakProject = (req, res) => {
  const { naam, maxeuro, uid, pw } = req.params;

  // Validate the input
  if (!naam || !maxeuro || !uid || !pw) {
    return res.status(400).send("All fields are required");
  }

  // Check if the UID and PW are valid
  const checkUserQuery =
    "SELECT * FROM Gebruiker WHERE id = ? AND wachtwoord = ? AND niveau = 0";
  db.query(checkUserQuery, [uid, pw], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      res.status(500).send("Error checking user");
      return;
    }

    if (results.length === 0) {
      return res.status(403).send("Unauthorized: Invalid UID or password");
    }

    // Create the project
    const query =
      "INSERT INTO Project (naam, spendeerbaarBedrag) VALUES (?, ?)";
    let exe = db.query(query, [naam, maxeuro], (err, results) => {
      if (err) {
        console.error("Error creating project:", err);
        res.status(500).send("Error creating project");
        return;
      }
      res.status(201).send("Project created successfully");
      log.logQuery(exe.sql, uid, 0, 0)
    });
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
    "SELECT * FROM Gebruiker WHERE id = ? AND wachtwoord = ? AND niveau = 0";
  db.query(checkAdminQuery, [adminid, pw], (err, results) => {
    if (err) {
      console.error("Error checking admin:", err);
      res.status(500).send("Error checking admin");
      return;
    }

    if (results.length === 0) {
      return res.status(403).send("Unauthorized: Invalid admin credentials");
    }

    // Update the project ID of the user
    const updateQuery = "UPDATE Gebruiker SET projectId = ? WHERE id = ?";
    let exe = db.query(
      updateQuery,
      [pid === "-1" ? null : pid, uid],
      (err, updateResults) => {
        if (err) {
          console.error("Error updating gebruiker:", err);
          res.status(500).send("Error updating gebruiker");
          return;
        }
        res.status(200).send("Gebruiker updated successfully");
        log.logQuery(exe.sql, uid, 0, pid)
      }
    );
  });
};
