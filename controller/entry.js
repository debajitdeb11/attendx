// jshint esversion: 6
const Entry = require("../model/entry");
const { validationResult } = require('express-validator');

exports.submit = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
           errors: errors.array()[0].msg
         });
    }

    const entry = new Entry (req.body);
    entry.save((err, entry) => {
    if (err) {
        console.log(err);
        return res.status(400).json({
            err: "Unable to submit response"
        });
    } else {
        res.json({
            firstname: entry.firstname,
            lastname: entry.lastname,
            astuRollNo: entry.astuRollNo,
            rollNo: entry.rollNo,
        });
    }
    });
};