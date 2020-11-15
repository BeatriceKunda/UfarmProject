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

const addFarmerOne = (req, res) => {
    res.status(200).render("add-farmer-one");
};

const managerFarmerOnes = async (req, res) => {
    const farmerOnes = await FarmerOnes.find({});
    res.status(200).render("manage-farmer-ones", { farmerOnes });
};

const editFarmerOne = async (req, res) => {
    const farmerOne = await FarmerOnes.findById(req.params.id);
    res.status(200).render("fo-profile", { farmerOne });
}

module.exports = { login, dashboard, addFarmerOne, managerFarmerOnes, editFarmerOne };