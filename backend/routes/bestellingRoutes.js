const express = require("express");
const router = express.Router();
const bestellingController = require("../controllers/bestellingController");

router.get("/getBestellingen/:projectId", bestellingController.getBestellingen);
router.put("/keurGoed/:bestellingId/:uid/:pw", bestellingController.keurGoed);
router.post(
  "/maakBestelling/:projID/:winkelId/:winkelNaam/:aantal/:totaleKostPrijsExclBtw/:leverTijd/:omschrijving/:artikelNr/:geplaatstDoor",
  bestellingController.maakBestelling
);

module.exports = router;
