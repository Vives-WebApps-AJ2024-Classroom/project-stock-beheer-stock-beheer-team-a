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

exports.keurGoed = (req, res) => {
  const { bestellingId, uid, pw } = req.params;

  // Validate the input
  if (!bestellingId || !uid || !pw) {
    return res.status(400).send("All fields are required");
  }

  // Check if the UID is the coach of the project associated with the bestelling
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

    // Approve the bestelling
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

exports.keurAf = (req, res) => {
  const { bestellingId, uid, pw, reden } = req.params;

  // Validate the input
  if (!bestellingId || !uid || !pw || !reden) {
    return res.status(400).send("All fields are required");
  }

  // Check if the UID is the coach of the project associated with the bestelling
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

    // Reject the bestelling
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

exports.ontKeur = (req, res) => {
  const { bestellingId, uid, pw } = req.params;

  // Validate the input
  if (!bestellingId || !uid || !pw) {
    return res.status(400).send("All fields are required");
  }

  // Check if the UID is the coach of the project associated with the bestelling
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

    // Unapprove the bestelling
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
  const { url } = req.body;

  // Validate the input
  if (
    !bestellingsId ||
    !gebruikersId ||
    !wachtwoord ||
    !winkelNaam ||
    !aantal ||
    !totaleKostPrijsExclBtw ||
    !leverTijd ||
    !omschrijving ||
    !artikelNr ||
    !url
  ) {
    return res.status(400).send("All fields are required");
  }

  // Check if the user is a member of the team and the bestelling is not approved
  const query = `
    SELECT b.goedgekeurdDoorCoach, g.niveau
    FROM Bestelling b
    JOIN Gebruiker g ON b.projectId = g.projectId
    WHERE b.id = ? AND g.id = ? AND g.wachtwoord = ? AND (g.niveau = 1 OR g.niveau = 2)
  `;
  db.query(query, [bestellingsId, gebruikersId, wachtwoord], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      res.status(500).send("Error checking user");
      return;
    }

    if (results.length === 0 || results[0].goedgekeurdDoorCoach !== null) {
      console.log(
        `Authorization failed for Gebruikers ID: ${gebruikersId}, Wachtwoord: ${wachtwoord}, Bestellings ID: ${bestellingsId}`
      );
      return res
        .status(403)
        .send(
          "Unauthorized: User is not a member of the team or the bestelling is already approved"
        );
    }

    // Update the bestelling
    const updateQuery = `
      UPDATE Bestelling
      SET winkelId = ?, winkelEnkelString = ?, aantal = ?, totaleKostPrijsExclBtw = ?, url = ?, leverTijd = ?, omschrijving = ?, artikelNr = ?
      WHERE id = ?
    `;
    db.query(
      updateQuery,
      [
        winkelId === "null" ? null : winkelId,
        winkelNaam,
        aantal,
        totaleKostPrijsExclBtw,
        url,
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

exports.pasBestellingAan = (req, res) => {
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
    geplaatstDoor,
    rqNummer,
    goedgekeurd,
    doorFDGeplaatst,
    verwachteAankomst,
    bestellingOntvangen,
    werkelijkBetaald,
    opmerking,
  } = req.params;
  const { url } = req.body;

  // Validate the input
  if (
    !bestellingsId ||
    !gebruikersId ||
    !wachtwoord ||
    !winkelNaam ||
    !aantal ||
    !totaleKostPrijsExclBtw ||
    !leverTijd ||
    !omschrijving ||
    !artikelNr ||
    !geplaatstDoor ||
    !rqNummer ||
    !url
  ) {
    return res.status(400).send("All fields are required");
  }

  // Check if the user is an administrator
  const query = `
    SELECT g.niveau
    FROM Gebruiker g
    WHERE g.id = ? AND g.wachtwoord = ? AND g.niveau = 3
  `;
  db.query(query, [gebruikersId, wachtwoord], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      res.status(500).send("Error checking user");
      return;
    }

    if (results.length === 0) {
      console.log(
        `Authorization failed for Gebruikers ID: ${gebruikersId}, Wachtwoord: ${wachtwoord}`
      );
      return res.status(403).send("Unauthorized: User is not an administrator");
    }

    // Update the bestelling
    const updateQuery = `
      UPDATE Bestelling
      SET winkelId = ?, winkelEnkelString = ?, aantal = ?, totaleKostPrijsExclBtw = ?, url = ?, leverTijd = ?, omschrijving = ?, artikelNr = ?, geplaatstDoor = ?, rqNummer = ?, goedgekeurdDoorCoach = ?, bestellingDoorFDGeplaatst = ?, verwachteAankomst = ?, bestellingOntvangen = ?, werkelijkBetaald = ?, opmerking = ?
      WHERE id = ?
    `;
    db.query(
      updateQuery,
      [
        winkelId === "null" ? null : winkelId,
        winkelNaam,
        aantal,
        totaleKostPrijsExclBtw,
        url,
        leverTijd,
        omschrijving,
        artikelNr,
        geplaatstDoor,
        rqNummer,
        goedgekeurd,
        doorFDGeplaatst,
        verwachteAankomst,
        bestellingOntvangen,
        werkelijkBetaald,
        opmerking,
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
