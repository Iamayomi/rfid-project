const express = require("express");

const studentController = require("../controller/studentController.js");
const upload = require("../utils/multer.js");

const router = express.Router({ mergeParams: true });

// create student route
// router.post("/create", studentController.createUser);

// get a student route
router.get("/:studentId/getStudent", studentController.getStudent);

// search by rfid or id route
router.get("/home", studentController.searchStudent);

// // delete a student route
router.delete("/:studentId/delete-student", studentController.deleteStudent);

// // updata student data route
router.patch(
  "/:studentId/update-student",
  upload.single("file"),
  studentController.updateStudent
);

// // get all student route
router.get("/get-students", studentController.getStudents);

module.exports = router;
