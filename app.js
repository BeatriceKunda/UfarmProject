// Tope Level Imports
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const farmerOneRouter = require("./routes/farmer-ones");

// load all environment variables in the .env file
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;

// ----- MIDDLEWARE -----
app.use(morgan("combined"));
app.use(express.json());

// ----- DATABASE -----
mongoose
    .connect("mongodb://localhost:27017/u-farm", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB Connection Succesful 😃 ✅"));


// ------- ROUTES -------
app.get("/", (req, res) => {
    res.status(200).json({ message: "It Works !!!" });
});

app.use("/farmer-one", farmerOneRouter); // farmer-one router


// ------ LISTENING  ------
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);