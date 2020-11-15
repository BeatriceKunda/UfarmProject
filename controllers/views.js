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
  

module.exports = { login, dashboard, addFarmerOne };