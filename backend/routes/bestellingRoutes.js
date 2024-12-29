const express = require("express");
const router = express.Router();
const bestellingController = require("../controllers/bestellingController");

router.get("/getBestellingen/:projectId", bestellingController.getBestellingen);
router.put("/keurGoed/:bestellingId/:uid/:pw", bestellingController.keurGoed);
router.put(
  "/keurAf/:bestellingId/:uid/:pw/:reden",
  bestellingController.keurAf
);
router.put("/ontKeur/:bestellingId/:uid/:pw", bestellingController.ontKeur);
router.put(
  "/pasBestellingAanRestricted/:bestellingsId/:gebruikersId/:wachtwoord/:winkelId/:winkelNaam/:aantal/:totaleKostPrijsExclBtw/:leverTijd/:omschrijving/:artikelNr",
  bestellingController.pasBestellingAanRestricted
);
router.put(
  "/pasBestellingAan/:bestellingsId/:gebruikersId/:wachtwoord/:winkelId/:winkelNaam/:aantal/:totaleKostPrijsExclBtw/:leverTijd/:omschrijving/:artikelNr/:geplaatstDoor/:rqNummer/:goedgekeurd/:doorFDGeplaatst/:verwachteAankomst/:bestellingOntvangen/:werkelijkBetaald/:opmerking",
  bestellingController.pasBestellingAan
);
router.post(
  "/maakBestelling/:projID/:winkelId/:winkelNaam/:aantal/:totaleKostPrijsExclBtw/:leverTijd/:omschrijving/:artikelNr/:geplaatstDoor",
  bestellingController.maakBestelling
);

module.exports = router;