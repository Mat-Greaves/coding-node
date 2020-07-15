const mongoose = require("mongoose");

const petsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    colour: { type: String, required: true }
});

module.exports = mongoose.model("pet", petsSchema);