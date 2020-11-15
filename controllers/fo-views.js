// const UrbanFarmers = require("../models/urban-farmer");


const dashboard = async (req, res) => {
    res.status(200).render("fo-dashboard");
};

module.exports = { dashboard };