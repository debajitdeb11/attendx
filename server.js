//jshint esversion: 6
// .env file
const envfile = require("dotenv").config();
if (envfile.error) {
    console.log("env file is missing or not configured");
    throw envfile.error.message;
} else {
    console.log(envfile.parsed);
}

// Express
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Connect to Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DATABASE is connected");
}).catch((err) => {
    console.log(err);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


// My Routes
const entryRoute = require("./routes/entry");
const adminRoute = require("./routes/auth");
// Routes
app.use("/api", entryRoute);
app.use("/api", adminRoute);

// Starting the server
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
});

