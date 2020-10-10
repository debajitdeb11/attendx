//jshint esversion: 6
const Admin = require("../model/admin");
const {validationResult} = require('express-validator');


exports.getAdminbyId = (req, res, next, id) => {
    Admin.findById(id).exec((err, admin) => {
        if (err || !admin) {
            res.status(400).json({
                error: "No User is found in Database"
            });
        } 

        req.pofile = admin;
        next();
    });
};


exports.getAdmin = (req, res) => {
    req.profile.encrypt_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.role = undefined;
    req.profile.hash = undefined;
    return res.json(req.profile);
};