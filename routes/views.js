const express = require("express");
const viewsController = require("../controllers/views");
const router = express.Router();

router.get('/', viewsController.login);
router.get('/login', viewsController.login);
// router.get('/ao-dashboard', viewsController.dashboard);
// router.get('/add-farmer-one', viewsController.addFarmerOne);
// router.get('/manage-farmer-ones', viewsController.managerFarmerOnes);


module.exports = router;