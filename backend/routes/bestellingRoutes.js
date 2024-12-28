const express = require("express");
const router = express.Router();
const bestellingController = require("../controllers/bestellingController");

router.get("/getBestellingen/:projectId", bestellingController.getBestellingen);

// Add the PUT route for approving a bestelling
router.put("/keurGoed/:bestellingId/:uid/:pw", bestellingController.keurGoed);

module.exports = router;
