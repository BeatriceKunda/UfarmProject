const FarmerOnes = require("../models/farmer-ones");

const getAllFarmerOnes = async (req, res) => {
    const farmerOnes = await FarmerOnes.find({});
    res.status(200).json({ message: "success", data: farmerOnes });
}

const addNewFarmerOne = async (req, res) => {
    // console.log(req.body);
    try {
        const farmerOne = await FarmerOnes.create(req.body);
        //  TODO: Add unique ID to FO
        res.status(201).json({ message: "success", farmerOne });
    } catch (error) {
        // console.log(error);
        res.status(400).json({ error: error.message });
    }
}


module.exports = { getAllFarmerOnes, addNewFarmerOne };