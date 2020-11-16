const UrbanFarmers = require("../models/urban-farmers");

// Helper Function to filter out fields which whould not be updated in the PATCH/PUT route
// It only takes in the allowed fields
// const filterObj = (obj, ...allowedFields) => {
//     const newObj = {};
//     Object.keys(obj).forEach((el) => {
//         // loop through provided obj and check if any of the keys in that obj are eq to the ones you would like to return
//         if (allowedFields.includes(el)) {
//             // if they exist, simply create a new obj with those desired fields
//             newObj[el] = obj[el];
//         }
//     });
//     return newObj;
// };


const getAllUrbanFarmers = async (req, res) => {
    const urbanFarmers = await UrbanFarmers.find({});
    res.status(200).json({ message: "success", data: urbanFarmers});
}

const addNewUrbanFarmer = async (req, res) => {
    try {
        const urbanFarmer = await UrbanFarmers.create(req.body);
        //  TODO: Add unique ID to UF
        res.status(201).json({ message: "success", urbanFarmer });
    } catch (error) {
        // console.log(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllUrbanFarmers,
    addNewUrbanFarmer,
};