const FarmerOnes = require("../models/farmer-ones");
const customId = require("custom-id");

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
    // Prevent the ward from being assigned during creation by deleting the field from the req body
    delete req.body.ward;
    try {
        const farmerOne = await FarmerOnes.create(req.body);
        //  TODO: Add unique ID to FO
        farmerOne.uniqueNumber = customId({});
        await farmerOne.save({ validateBeforeSave: false });

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


// ----- ASSIGNING FO TO WARD ----------
/* Incolves 3 steps-> 
    1. Check if FO is active
    2. Revoke any existing FO' ward assignment (This will deactivate the FO)
    3. Assign the new FO a ward
*/

const isFOactive = async (req, res, next) => {
    try {
        const farmerOne = await FarmerOnes.findById(req.params.id);
        // if the FO is inactive, do no assign ward
        if (!farmerOne.active)
            return res.status(400).json({
                message: "FarmerOne is inactive and cannot be assigned to Ward",
            });

        // check if the active FO alread has this ward
        if (farmerOne.ward === req.body.ward) {
            return res.status(400).json({
                message: "Cannot ressign the same ward to FO",
            });
        }

        req.farmerOne = farmerOne;
        req.ward = req.body.ward;
        console.log("Attempting to assign ward to FO");
        next();
    } catch (error) {
        return res.status(404).json({
            message: "Could find an FO with that ID",
            error: error,
        });
    }
};

const revokeExistingWardAssignment = async (req, res, next) => {
    // deactivate any active FOs with that ward
    try {
        const formerWardFo = await FarmerOnes.findOne({ ward: req.ward, active: true });

        formerWardFo.active = false;
        formerWardFo.decommissionedOn = Date.now();
        formerWardFo.save({ validateBeforeSave: false });

        console.log("An Existing FO with that ward has been deactivated");
        next();
    } catch (error) {
        // Move ON if NO active FOs with the ward have been found
        next();
    }
};

const assignWardToFarmerOne = async (req, res) => {
    // assign ward to the new FO
    try {
        const farmerOne = req.farmerOne;
        farmerOne.ward = req.body.ward;
        farmerOne.save({ validateBeforeSave: false });
        res.status(200).json({ message: "successfully assigned ward", farmerOne });
    } catch (error) {
        res.status(404).json({
            message: "Could not Assign Ward to FO with that ID as it is not Found",
            error: error,
        });
    }
};

const deactivateFarmerOne = async (req, res) => {
    try {
        const farmerOne = await FarmerOnes.findById(req.params.id);
        if (!farmerOne.active)
            return res.status(200).json({
                message: "FO already inactive",
            });
        farmerOne.active = false;
        farmerOne.decommissionedOn = Date.now();
        await farmerOne.save({ validateBeforeSave: false });
        res.status(200).json({ message: "successful deactivation", farmerOne });
    } catch (error) {
        return res.status(404).json({
            message: "Could not update FO with that ID as it is not Found",
            error: error,
        });
    }
};

module.exports = {
    getAllFarmerOnes,
    addNewFarmerOne,
    getSpecificFarmerOne,
    editSpecificFarmerOne,
    isFOactive,
    revokeExistingWardAssignment,
    assignWardToFarmerOne,
    deactivateFarmerOne
};