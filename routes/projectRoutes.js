const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post(
  "/maakProject/:naam/:maxeuro/:uid/:pw",
  projectController.maakProject
);
router.put(
  "/steekGebruikerInProject/:uid/:pid/:adminid/:pw",
  projectController.steekGebruikerInProject
);

module.exports = router;
