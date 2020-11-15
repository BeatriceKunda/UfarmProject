const express = require("express");
const router = express.Router();
const { isFOactive, revokeExistingWardAssignment, assignWardToFarmerOne } = require("../controllers/farmer-ones");

const farmerOneController = require("../controllers/farmer-ones");


router.get("/", farmerOneController.getAllFarmerOnes);
router.post("/", farmerOneController.addNewFarmerOne);
router.get("/:id", farmerOneController.getSpecificFarmerOne);
router.patch("/:id", farmerOneController.editSpecificFarmerOne);
router.patch("/:id/assign-ward", isFOactive, revokeExistingWardAssignment, assignWardToFarmerOne);
router.patch("/:id/deactivate", farmerOneController.deactivateFarmerOne);

module.exports = router;