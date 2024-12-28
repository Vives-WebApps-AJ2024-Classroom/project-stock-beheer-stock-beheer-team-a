const express = require("express");
const router = express.Router();
const gebruikerController = require("../controllers/gebruikerController");

router.get("/gebruikers", gebruikerController.getGebruikers);
router.get("/gebruikers/:id", gebruikerController.getGebruikerById);
router.post("/gebruikers", gebruikerController.createGebruiker);
router.put("/gebruikers/:id", gebruikerController.updateGebruiker);
router.delete("/gebruikers/:id", gebruikerController.deleteGebruiker);

module.exports = router;
