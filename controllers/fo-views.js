const UrbanFarmers = require("../models/urban-farmers");


const dashboard = async (req, res) => {
    const urbanFarmers = await UrbanFarmers.find({});
    res.status(200).render("fo-dashboard", { urbanFarmers });
};

const addUrbanFarmer = async (req, res) => {
    res.status(200).render("add-urban-farmer");
}

const produceApproval = async (req, res) => {
    res.status(200).render("produce-approval");
}

module.exports = { dashboard, addUrbanFarmer, produceApproval };