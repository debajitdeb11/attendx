// jshint esversion: 6
const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const {submit} = require("../controller/entry");

router.post("/submit", [
    check("firstname")
    .isLength({ min: 3 })
    .withMessage("First Name must be atleast 3 character long"),
    check("lastname")
    .isLength({min: 3})
    .withMessage("Last Name must be atleast 3 character long"),
  check("email").isEmail().withMessage("Email ID is Required"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 character long"),
], submit);

module.exports = router;