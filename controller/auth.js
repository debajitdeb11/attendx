// jshint esversion: 6
const Admin = require("../model/admin");
const {check, validationResult} = require("express-validator");


exports.signUp = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const admin = new Admin(req.body);

    admin.save((err, admin) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                err: "Unable to save user in DB"
            });
        } else {
            res.json({
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email,
                id: admin._id,
            });
        }
    });
};

exports.signIn = (req, res) => {
    const errors = validationResult(req);
    
    const {email, password} = req.body;

    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    Admin.findOne({admin}, (err, admin) => {
        if (err || !admin) {
            return res.status(400).json({
                error: "Admin doesn't exist"
            });
        } 

        if (!admin.authenticate(password)) {
            return res.status(401).json({
                error: "Password doesn't match",
            });
        }


        // Create Token
        const token = jwt.sign({_id: admin._id},
             process.env.SECRET);


        // Put Token in Cookie
        res.cookie("token", token, {expire: new Date() + 1000});

        // Send response to frontend
        const {_id, firstname, email, role } = admin;
        return res.json({
            token, admin: { _id, firstname, email, role }
        });
    });  
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Successfully logged out!"
    });
};

// Restricted Routes
// exports.isSignedIn = expressJwt({
//     secret: process.env.SECRET,
//     userProperty: "auth",
// });

// Custom Middleware
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status.status(403).json({
            error: "ACCESS DENIED!"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not admin"
        });
    }

    next();
};


