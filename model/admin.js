//jshint esversion:6
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },

    email: {
        type: email,
        required: true,
        trim: true,
        unique: true,
    },

    encrypt_password: {
        type: String,
        required: true,
    },

    role: {
        type: Number,
        default: 0,
    },
}, {timestamps: true} 
);

adminSchema.virtual("password")
.set(function (password) {
    this._password = password;
    this.encrypt_password = this.securePassword(password);
})
.get(function() {
    return this._password;
});

adminSchema.method = {
    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encrypt_password;
    },

    securePassword: function(plainPassword) {
        if (!plainPassword) return "";

        try {
            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                if (err) {
                    console.log(err);
                } else {
                    return hash;
                }
            });

        } catch (e) {
            console.log(e);
            return "";
        }

    }
};

module.exports = mongoose.model("adminSchema", adminSchema);