const express = require("express");

const studentController = require("../controller/studentController.js");

const router = express.Router({ mergeParams: true });

// student image route
router.get("/:image", studentController.getImage);

module.exports = router;
