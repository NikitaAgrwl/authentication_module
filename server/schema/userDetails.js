const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
    {
        userType    : { type: String, required: true },
        name        : { type: String, required: true },
        email       : { type: String, required: true, unique: true },
        password    : { type: String, required: true },
        city        : { type: String },
        contact     : { type: Number },
    },
    {
        collection  : "user-data",
    }
);

const model = mongoose.model("userData", userDetailsSchema);

module.exports = model;