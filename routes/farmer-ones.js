const express = require("express");
const router = express.Router();

const farmerOneController = require("../controllers/farmer-ones");


router.get("/", farmerOneController.getAllFarmerOnes);
// router.post("/", farmerOneController.addNewFarmerOne);
// router.get("/:id", farmerOneController.getSpecificFarmerOne);
// router.patch("/:id", farmerOneController.editSpecificFarmerOne);

module.exports = router;