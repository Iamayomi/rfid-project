const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const studentRoute = require("./routes/studentRoute");
// const imageRoute = require("./routes/imageRoute");

//setup cors for our project
app.use(cors());

//load static files
app.use("/images", express.static(path.join(__dirname, "/images")));

//parse the json request and put it in the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//load our rest api routes
// app.use("/", imageRoute);

app.use("/api/v1/rfid-attendance-project/students", studentRoute);

module.exports = app;
