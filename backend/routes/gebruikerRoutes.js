const express = require("express");
const router = express.Router();
const gebruikerController = require("../controllers/gebruikerController");

router.get("/getStudenten/:projectId", gebruikerController.getStudenten);
router.get("/getCoach/:projectId", gebruikerController.getCoach);

module.exports = router;
