const db = require("../db");

// Haal bestellingen op voor een specifiek project
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

// Keur een bestelling goed
exports.keurGoed = (req, res) => {
  const { bestellingId, uid, pw } = req.params;

  // Valideer de invoer
  if (!bestellingId || !uid || !pw) {
    return res.status(400).send("Alle velden zijn verplicht");
  }

  // Controleer of de UID de coach is van het project dat bij de bestelling hoort
  const query = `
    SELECT b.projectId, g.niveau
    FROM Bestelling b
    JOIN Gebruiker g ON b.projectId = g.projectId
    WHERE b.id = ? AND g.id = ? AND g.wachtwoord = ? AND g.niveau = 1
  `;
  db.query(query, [bestellingId, uid, pw], (err, results) => {
    if (err) {
      console.error("Error checking coach:", err);
      res.status(500).send("Error checking coach");
      return;
    }

    if (results.length === 0) {
      console.log(
        `Authorization failed for UID: ${uid}, PW: ${pw}, Bestelling ID: ${bestellingId}`
      );
      return res
        .status(403)
        .send(
          "Unauthorized: UID is not the coach of the project associated with this bestelling"
        );
    }

    // Keur de bestelling goed
    const updateQuery =
      "UPDATE Bestelling SET goedgekeurdDoorCoach = 1 WHERE id = ?";
    db.query(updateQuery, [bestellingId], (err, updateResults) => {
      if (err) {
        console.error("Error approving bestelling:", err);
        res.status(500).send("Error approving bestelling");
        return;
      }
      res.status(200).send("Bestelling approved successfully");
    });
  });
};

// Maak of update een bestelling
exports.maakOfUpdateBestelling = (req, res) => {
  const {
    projID,
    winkelId,
    winkelNaam,
    aantal,
    totaleKostPrijsExclBtw,
    leverTijd,
    omschrijving,
    artikelNr,
    geplaatstDoor,
    isUpdate,
  } = req.params;
  const {
    url,
    rqNummer,
    goedgekeurdDoorCoach,
    bestellingDoorFDGeplaatst,
    verwachteAankomst,
    bestellingOntvangen,
    werkelijkBetaald,
    opmerking,
    adminId,
    adminPw,
  } = req.body;

  // Valideer de invoer
  if (
    !projID ||
    !winkelNaam ||
    !aantal ||
    !totaleKostPrijsExclBtw ||
    !leverTijd ||
    !omschrijving ||
    !artikelNr ||
    !geplaatstDoor ||
    !url
  ) {
    return res.status(400).send("Alle velden zijn verplicht");
  }

  // Check if the user is an admin
  const checkAdminQuery =
    "SELECT * FROM Gebruiker WHERE id = ? AND wachtwoord = ? AND niveau = 2";
  db.query(checkAdminQuery, [adminId, adminPw], (err, results) => {
    if (err) {
      console.error("Error checking admin credentials:", err);
      res.status(500).send("Error checking admin credentials");
      return;
    }

    const isAdmin = results.length > 0;

    if (isUpdate === "true") {
      // Update de bestelling
      const updateFields = [
        "winkelId = ?",
        "winkelEnkelString = ?",
        "aantal = ?",
        "totaleKostPrijsExclBtw = ?",
        "url = ?",
        "leverTijd = ?",
        "omschrijving = ?",
        "artikelNr = ?",
      ];
      const updateValues = [
        winkelId === "null" ? null : winkelId,
        winkelNaam,
        aantal,
        totaleKostPrijsExclBtw,
        url,
        leverTijd,
        omschrijving,
        artikelNr,
      ];

      if (isAdmin) {
        updateFields.push(
          "rqNummer = ?",
          "goedgekeurdDoorCoach = ?",
          "bestellingDoorFDGeplaatst = ?",
          "verwachteAankomst = ?",
          "bestellingOntvangen = ?",
          "werkelijkBetaald = ?",
          "opmerking = ?"
        );
        updateValues.push(
          rqNummer,
          goedgekeurdDoorCoach,
          bestellingDoorFDGeplaatst,
          verwachteAankomst,
          bestellingOntvangen,
          werkelijkBetaald,
          opmerking
        );
      }

      updateValues.push(geplaatstDoor);

      const updateQuery = `
        UPDATE Bestelling
        SET ${updateFields.join(", ")}
        WHERE id = ?
      `;
      db.query(updateQuery, updateValues, (err, updateResults) => {
        if (err) {
          console.error("Error updating bestelling:", err);
          res.status(500).send("Error updating bestelling");
          return;
        }
        res.status(200).send("Bestelling updated successfully");
      });
    } else {
      // Maak een nieuwe bestelling
      const insertFields = [
        "projectId",
        "winkelId",
        "winkelEnkelString",
        "aantal",
        "totaleKostPrijsExclBtw",
        "url",
        "leverTijd",
        "omschrijving",
        "artikelNr",
        "goedgekeurdDoorCoach",
      ];
      const insertValues = [
        projID,
        winkelId === "null" ? null : winkelId,
        winkelNaam,
        aantal,
        totaleKostPrijsExclBtw,
        url,
        leverTijd,
        omschrijving,
        artikelNr,
        0,
      ];
      // EXTRA:: admin heeft extra velden die ingevuld moeten worden
      if (isAdmin) {
        insertFields.push(
          "rqNummer",
          "bestellingDoorFDGeplaatst",
          "verwachteAankomst",
          "bestellingOntvangen",
          "werkelijkBetaald",
          "opmerking"
        );
        insertValues.push(
          rqNummer,
          bestellingDoorFDGeplaatst,
          verwachteAankomst,
          bestellingOntvangen,
          werkelijkBetaald,
          opmerking
        );
      }

      const insertQuery = `
        INSERT INTO Bestelling (${insertFields.join(", ")})
        VALUES (${insertValues.map(() => "?").join(", ")})
      `;
      db.query(insertQuery, insertValues, (err, results) => {
        if (err) {
          console.error("Error creating bestelling:", err);
          res.status(500).send("Error creating bestelling");
          return;
        }
        res.status(201).send("Bestelling created successfully");
      });
    }
  });
};
