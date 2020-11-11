const FarmerOnes = require("../models/farmer-ones");

const getAllFarmerOnes = async (req, res) => {
    const farmerOnes = await FarmerOnes.find({});
    res.status(200).json({ message: "success", data: farmerOnes });
}


module.exports = { getAllFarmerOnes };