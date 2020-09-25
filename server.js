//jshint esversion: 6

const express = require("express");
const app = express();

const PORT = 3000;

app.get("/" ,(req, res) => {
    res.send("Hello");
});

app.listen(3000, () => {
    console.log(`Server is running on ${PORT}`);
});