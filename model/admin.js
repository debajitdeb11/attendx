//jshint esversion:6
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const crypto = require("crypto-js");
// const uuidv1 = require("uuid/v1");

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
        type: String,
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

//TODO: Not Working
// adminSchema
// .virtual("password")
// .set(function (password) {
//   this._password = password;
//   this.encrypt_password = this.securePassword(password);
// }).get(function () {
//   return this._password;
// })
// ;

// adminSchema.method = {

//   securePassword : function (plainPassword) {
//     if (!plainPassword) return "";
//     const hash = bcrypt.hashSync(plainPassword, saltRounds);
//     console.log(hash);
//     return hash;
//   },
// };


// adminSchema.virtual("password")
//   .set(function(password) {
//     this._password = password;
//     this.encrypt_password = this.securePassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

  // adminSchema.method = {
  //   authenticate: function (plainPassword) {
  //     bcrypt.compare(plainPassword, hash, function(err, result) {
  //       if (err) {
  //         throw err.message;
  //       }
  //       return (result === this.encrypt_password);
  //   });
  //   } ,

  //   securePassword: function (plainPassword) {
  //     return (bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
  //       if (!plainPassword)
  //         return "";

  //       if (err) {
  //         throw err.message;
  //       }
  //       return hash;
  //   }));
  //   }  
  // };
  
module.exports = mongoose.model("AdminSchema", adminSchema);