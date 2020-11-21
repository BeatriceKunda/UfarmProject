const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const FarmerOne = new Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: [true, "Please specify your Gender"],
    },
    ward: { type: String },
    periodOfWardStay: {
        type: Number,
        required: true,
        validate: {
            validator: function (num) {
                return num > 10;
            },
            message: "FO must have lived in the area for more than 10 years",
        },
    },
    homeDirections: { type: String, required: true },
    residenceType: {
        type: String,
        enum: ["permanent", "temporary"],
        required: true,
    },
    registeredOn: { type: Date, required: true, default: Date.now },
    decommissionedOn: { type: Date },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid Email"],
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
            message: "Please provide a valid Ugandan Mobile Number",
        },
    },
    nin: { type: String, required: true },
    uniqueNumber: { type: String, unique: true },
    activities: String,
    active: { type: Boolean, default: true },
    profilePic: String
});

FarmerOne.pre("save", async function (next) {

    // set a default profile Pic depending on gender
    this.profilePic = this.gender === 'Male' ? 'undraw_profile_pic_ic5t' : 'undraw_profile_1';

    // this ensures that you the call next function in the middleware stack
    next();
});


module.exports = mongoose.model("FarmerOne", FarmerOne);
