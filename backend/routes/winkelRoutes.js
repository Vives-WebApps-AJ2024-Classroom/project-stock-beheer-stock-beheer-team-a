const express = require("express");
const router = express.Router();
const winkelController = require("../controllers/winkelController");

router.get("/winkels", winkelController.getWinkels);

module.exports = router;
