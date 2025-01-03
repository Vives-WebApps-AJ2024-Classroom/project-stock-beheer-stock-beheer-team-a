const express = require("express");
const router = express.Router();
const gebruikerController = require("../controllers/gebruikerController");

router.get("/gebruikers", gebruikerController.getGebruikers);
router.get("/gebruikers/:id", gebruikerController.getGebruikerById);
router.get("/gebruiker", gebruikerController.getGebruikerByEmail);
router.post(
  "/gebruiker/:naam/:achternaam/:rol/:email/:wachtwoord",
  gebruikerController.createGebruiker
);
router.put(
  "/gebruiker/:id/:naam/:achternaam/:rol/:email/:wachtwoord/:adminid/:adminpw",
  gebruikerController.updateGebruiker
);
router.delete(
  "/gebruiker/:id/:adminid/:adminpw",
  gebruikerController.deleteGebruiker
);

module.exports = router;
