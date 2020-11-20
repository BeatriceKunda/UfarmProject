const UrbanFarmers = require("../models/urban-farmers");


const dashboard = async (req, res) => {
    const urbanFarmers = await UrbanFarmers.find({});
    res.status(200).render("fo-dashboard", { urbanFarmers });
};

const addUrbanFarmer = async (req, res) => {
    res.status(200).render("add-urban-farmer");
}

const produceApproval = async (req, res) => {
    // TODO:  Get all produce that is pending approval from DB
    res.status(200).render("produce-approval");
}

const produceDetails = async (req, res) => {
    //TODO: Get particular produce details given its id
    res.status(200).render("produce-details")
}

module.exports = { dashboard, addUrbanFarmer, produceApproval, produceDetails };