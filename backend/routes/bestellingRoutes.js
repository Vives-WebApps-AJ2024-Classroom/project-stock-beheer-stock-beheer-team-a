const express = require("express");
const router = express.Router();
const bestellingController = require("../controllers/bestellingController");

router.get("/getBestellingen/:projectId", bestellingController.getBestellingen);

module.exports = router;
