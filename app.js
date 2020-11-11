// Tope Level Imports
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// load all environment variables in the .env file
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;

// ----- MIDDLEWARE -----
app.use(morgan("combined"));
app.use(express.json());


// ------- ROUTES -------
app.get("/", (req, res) => {
    res.status(200).json({ message: "It Works !!!" });
});


// ------ LISTENING  ------
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);