// Top Level Imports
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const farmerOneRouter = require("./routes/farmer-ones");
const viewRouter = require("./routes/views");

// load all environment variables in the .env file
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;

// ----- MIDDLEWARE -----
app.use(morgan("combined"));
app.use(express.json());

// ------- STATIC -------
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// ----- DATABASE -----
mongoose
    .connect("mongodb://localhost:27017/u-farm", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB Connection Succesful 😃 ✅"));


// ------- ROUTES -------
app.use("/", viewRouter);

app.use("/farmer-one", farmerOneRouter); // farmer-one router


// ------ LISTENING  ------
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);