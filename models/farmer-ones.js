const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const FarmerOne = new Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please specify your Gender"]
    },
    ward: { type: String, required: true },
    periodOfWardStay: { type: Number, required: true },
    homeDirections: { type: String, required: true },
    residenceType: { type: String, enum: ["permanent", "temporary"], required: true },
    registeredOn: { type: Date, required: true, default: Date.now },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid Email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please a phone number"],
        unique: true,
        trim: true,
        validate: {
            validator: function (num) {
                return validator.isMobilePhone(num, "en-UG"); // Restrict to UG numbers
            },
            message: "Please provide a valid Ugandan Mobile Number"
        }
    },
    nin: { type: String, required: true },
    uniqueNumber: { type: String, unique: true },
    activities: String

});

module.exports = mongoose.model("FarmerOne", FarmerOne);