const customId = require("custom-id");
const FarmerOnes = require("../models/farmer-ones");

const login = (req, res) => {
    console.log(req.url);
    res.status(200).render("login");
};

const dashboard = async (req, res) => {
    const farmerOnes = await FarmerOnes.find({
        active: true,
        ward: { $exists: true },
    });
    res.status(200).render("ao-dashboard", { farmerOnes });
};

// renders the form
const addFarmerOne = (req, res) => {
    res.status(200).render("add-farmer-one");
};

// actually uses the form to create the FO
const addFarmerOneForm = async (req, res) => {
    console.log(req.body);
    delete req.body.ward;
    const farmerOne = await FarmerOnes.create(req.body);
    //  TODO: Add unique ID to FO
    farmerOne.uniqueNumber = customId({});
    await farmerOne.save({ validateBeforeSave: false });
    res.status(200).render("assign-ward-fo", { farmerOne });
}

const managerFarmerOnes = async (req, res) => {
    const farmerOnes = await FarmerOnes.find({});
    res.status(200).render("manage-farmer-ones", { farmerOnes });
};

const editFarmerOne = async (req, res) => {
    const farmerOne = await FarmerOnes.findById(req.params.id);
    res.status(200).render("fo-profile", { farmerOne });
}

const assignWard = async (req, res) => {
    const farmerOne = await FarmerOnes.findById(req.params.id);
    res.status(200).render("assign-ward-fo", { farmerOne });
}

module.exports = { login, dashboard, addFarmerOne, managerFarmerOnes, editFarmerOne, addFarmerOneForm, assignWard };