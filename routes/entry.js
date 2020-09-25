// jshint esversion: 6
const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const {submit} = require("../controller/entry");

router.post("/submit", [
    check("firstname").isLength({min: 3}).withMessage("First name must be atleast 3 character long!"),
    check("lastname", isLength({min: 2})).withMessage("Last name must be atleast 2 character long!"),
    check("astuRollNo").isLength({min:5}).withMessage("Astu Roll number is required!"),
    check("rollNo").isLength({min: 2}).withMessage("Class Roll number is required!")
], submit);

module.exports = router;