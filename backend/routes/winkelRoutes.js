const express = require("express");
const router = express.Router();
const winkelController = require("../controllers/winkelController");

router.get("/winkels", winkelController.getWinkels);

// Add the POST route for creating a new Winkel
router.post(
  "/maakWinkel/:naam/:specializatie/:uid/:pw",
  winkelController.maakWinkel
);

module.exports = router;
