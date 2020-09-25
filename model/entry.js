// jshint esversion: 6
const mongoose = require ("mongoose");

const entrySchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required: true,
        trim: true,
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
    },

    astuRollNo: {
        type: String,
        trim: true,
        required: true
    },

    rollNo: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true}
);

module.exports = mongoose.model("entryData", entrySchema);