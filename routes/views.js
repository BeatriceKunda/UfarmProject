const express = require("express");
const agricOfficerviewsController = require("../controllers/ao-views");
const farmerOneViewsController = require("../controllers/fo-views");

const router = express.Router();

router.get('/', agricOfficerviewsController.login);
router.get('/login', agricOfficerviewsController.login);

// ------- Agricultural officer ---------
router.get("/ao-dashboard", agricOfficerviewsController.dashboard);
router.get('/add-farmer-one', agricOfficerviewsController.addFarmerOne);
router.get('/manage-farmer-ones', agricOfficerviewsController.managerFarmerOnes);
router.get('/farmer-one/:id', agricOfficerviewsController.editFarmerOne);
router.post('/add-fo-form', agricOfficerviewsController.addFarmerOneForm);
router.get('/assign-ward/:id', agricOfficerviewsController.assignWard);


// ------- Farmer One ---------
router.get("/fo-dashboard", farmerOneViewsController.dashboard);
router.get("/add-urban-farmer", farmerOneViewsController.addUrbanFarmer);
router.get("/produce-approval", farmerOneViewsController.produceApproval);
router.get("/produce-details/:id", farmerOneViewsController.produceDetails);

module.exports = router;