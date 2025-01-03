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
  "/pasBestellingAan/:bestellingsId/:gebruikersId/:wachtwoord/:winkelId/:winkelNaam/:aantal/:totaleKostPrijsExclBtw/:leverTijd/:omschrijving/:artikelNr/:geplaatstDoor/:rqNummer/:goedgekeurd/:doorFDGeplaatst/:verwachteAankomst/:bestellingOntvangen/:werkelijkBetaald/:opmerking",
  bestellingController.pasBestellingAan
);
router.delete(
  "/delBestelling/:bestellingId/:uid/:pw",
  bestellingController.delBestelling
);
router.post(
  "/maakBestelling/:projID/:winkelId/:winkelNaam/:aantal/:totaleKostPrijsExclBtw/:leverTijd/:omschrijving/:artikelNr/:geplaatstDoor",
  bestellingController.maakBestelling
);
router.post(
  "/maakOfUpdateBestelling/:projID/:winkelId/:winkelNaam/:aantal/:totaleKostPrijsExclBtw/:leverTijd/:omschrijving/:artikelNr/:geplaatstDoor/:isUpdate",
  bestellingController.maakOfUpdateBestelling
);

module.exports = router;
