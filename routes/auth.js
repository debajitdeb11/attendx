// jshint esversion: 6
const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const {signIn,signOut,signUp} = require("../controller/auth");


// Signup
router.post("/signup",[
    check("firstname").isLength({min: 3}).withMessage("Minimum 3 character required"),
    check("lastname").isLength({min: 3}).withMessage("Minimum 3 character required"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min: 5}).withMessage("Minimum 5 character required")
], signUp);

// Signin
router.post("/signin", [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min: 5}).withMessage("Minimum 5 character required")
], signIn);

// Signout
router.get("/signout", signOut);

module.exports = router;