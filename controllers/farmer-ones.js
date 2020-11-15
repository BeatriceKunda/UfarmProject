const FarmerOnes = require("../models/farmer-ones");

// Helper Function to filter out fields which whould not be updated in the PATCH/PUT route
// It only takes in the allowed fields
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        // loop through provided obj and check if any of the keys in that obj are eq to the ones you would like to return
        if (allowedFields.includes(el)) {
            // if they exist, simply create a new obj with those desired fields
            newObj[el] = obj[el];
        }
    });
    return newObj;
};


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

const getSpecificFarmerOne = async (req, res) => {
    try {
        const farmerOne = await FarmerOnes.findById(req.params.id);
        res.status(200).json({ message: "success", farmerOne: farmerOne });
    } catch (error) {
        // console.log(error);
        res.status(404).json({ message: "No FO Found with That Id" });
    }
};

const editSpecificFarmerOne = async (req, res) => {
    // Only allow phoneNumber and activities fields by using the helper filter function
    const filteredBody = filterObj(req.body, "phoneNumber", "activities");

    try {
        // Update FO document using the filtered fields
        const farmerOne = await FarmerOnes.findByIdAndUpdate(
            req.params.id,
            filteredBody,
            { new: true, runValidators: true }
        );
        res.status(200).json({
            message: "successfully updated FO details",
            farmerOne: farmerOne,
        });
    } catch (error) {
        // console.log(error);
        res
            .status(404)
            .json({ message: "Could not update FO with that ID as it is not Found" });
    }
};

module.exports = { getAllFarmerOnes, addNewFarmerOne, getSpecificFarmerOne, editSpecificFarmerOne };