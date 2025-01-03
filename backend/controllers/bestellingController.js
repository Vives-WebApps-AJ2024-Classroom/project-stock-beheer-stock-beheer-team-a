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

// Keur een bestelling af
exports.keurAf = (req, res) => {
  const { bestellingId, uid, pw, reden } = req.params;

  // Valideer de invoer
  if (!bestellingId || !uid || !pw || !reden) {
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

    // Keur de bestelling af
    const updateQuery =
      "UPDATE Bestelling SET goedgekeurdDoorCoach = 0, opmerking = ? WHERE id = ?";
    db.query(updateQuery, [reden, bestellingId], (err, updateResults) => {
      if (err) {
        console.error("Error rejecting bestelling:", err);
        res.status(500).send("Error rejecting bestelling");
        return;
      }
      res.status(200).send("Bestelling rejected successfully");
    });
  });
};

// Ontkeur een bestelling
exports.ontKeur = (req, res) => {
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

    // Ontkeur de bestelling
    const updateQuery =
      "UPDATE Bestelling SET goedgekeurdDoorCoach = NULL WHERE id = ?";
    db.query(updateQuery, [bestellingId], (err, updateResults) => {
      if (err) {
        console.error("Error unapproving bestelling:", err);
        res.status(500).send("Error unapproving bestelling");
        return;
      }
      res.status(200).send("Bestelling unapproved successfully");
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

// Verwijder een bestelling
exports.delBestelling = (req, res) => {
  const { bestellingId, uid, pw } = req.params;

  // Valideer de invoer
  if (!bestellingId || !uid || !pw) {
    return res.status(400).send("Alle velden zijn verplicht");
  }

  // Controleer of de gebruiker gemachtigd is om de bestelling te verwijderen
  const query = `
    SELECT b.goedgekeurdDoorCoach, g.niveau
    FROM Bestelling b
    JOIN Gebruiker g ON b.projectId = g.projectId
    WHERE b.id = ? AND g.id = ? AND g.wachtwoord = ?
  `;
  db.query(query, [bestellingId, uid, pw], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      res.status(500).send("Error checking user");
      return;
    }

    if (
      results.length === 0 ||
      (results[0].goedgekeurdDoorCoach !== null && results[0].niveau !== 2)
    ) {
      console.log(
        `Authorization failed for UID: ${uid}, PW: ${pw}, Bestelling ID: ${bestellingId}`
      );
      return res
        .status(403)
        .send("Unauthorized: User is not authorized to delete this bestelling");
    }

    // Verwijder de bestelling
    const deleteQuery = "DELETE FROM Bestelling WHERE id = ?";
    db.query(deleteQuery, [bestellingId], (err, deleteResults) => {
      if (err) {
        console.error("Error deleting bestelling:", err);
        res.status(500).send("Error deleting bestelling");
        return;
      }
      res.status(200).send("Bestelling deleted successfully");
    });
  });
};

// Pas een bestelling aan met beperkte rechten
exports.pasBestellingAanRestricted = (req, res) => {
  const {
    bestellingsId,
    gebruikersId,
    wachtwoord,
    winkelId,
    winkelNaam,
    aantal,
    totaleKostPrijsExclBtw,
    leverTijd,
    omschrijving,
    artikelNr,
  } = req.params;

  // Valideer de invoer
  if (
    !bestellingsId ||
    !gebruikersId ||
    !wachtwoord ||
    !winkelNaam ||
    !aantal ||
    !totaleKostPrijsExclBtw ||
    !leverTijd ||
    !omschrijving ||
    !artikelNr
  ) {
    return res.status(400).send("Alle velden zijn verplicht");
  }

  // Controleer of de gebruiker gemachtigd is om de bestelling aan te passen
  const checkUserQuery =
    "SELECT * FROM Gebruiker WHERE id = ? AND wachtwoord = ?";
  db.query(checkUserQuery, [gebruikersId, wachtwoord], (err, results) => {
    if (err) {
      console.error("Error checking user credentials:", err);
      res.status(500).send("Error checking user credentials");
      return;
    }

    if (results.length === 0) {
      return res.status(403).send("Unauthorized: Invalid user credentials");
    }

    // Pas de bestelling aan
    const updateQuery = `
      UPDATE Bestelling
      SET winkelId = ?, winkelEnkelString = ?, aantal = ?, totaleKostPrijsExclBtw = ?, leverTijd = ?, omschrijving = ?, artikelNr = ?
      WHERE id = ? AND goedgekeurdDoorCoach IS NULL
    `;
    db.query(
      updateQuery,
      [
        winkelId === "null" ? null : winkelId,
        winkelNaam,
        aantal,
        totaleKostPrijsExclBtw,
        leverTijd,
        omschrijving,
        artikelNr,
        bestellingsId,
      ],
      (err, updateResults) => {
        if (err) {
          console.error("Error updating bestelling:", err);
          res.status(500).send("Error updating bestelling");
          return;
        }
        res.status(200).send("Bestelling updated successfully");
      }
    );
  });
};
