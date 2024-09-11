const Student = require("../models/studentModel");
const path = require("path");
const { SerialPort, ReadlineParser } = require("serialport");
const fs = require("fs");

const arduinoPort = new SerialPort({
  path: "COM6",
  baudRate: 9600,
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// // create a student
parser.on("data", async (uid) => {
  const UID = uid.replace(/\s+/g, "");
  console.log(UID);

  if (UID === "469D86A4") {
    let student = await Student.create({
      name: "Kolawole Olaoluwa",
      matric_no: "EES/18/19/0303",
      image: "ola.jpg",
      course: "Computer Engineering",
      rfid_badge: uid,
    });
  }

  if (UID === "666B50A3") {
    let student = await Student.create({
      name: "Fadipe Boluwatife Saheed",
      matric_no: "EES/18/19/0240",
      image: "bolu.JPG",
      course: "Computer Engineering",
      rfid_badge: uid,
    });
  }

  if (UID === "739E230D") {
    let student = await Student.create({
      name: "Amodu Ayomide Sherif",
      matric_no: "EES/19/20/0158",
      image: "ayo.jpg",
      course: "Computer Engineering",
      rfid_badge: uid,
    });
  }
});

// get a student
exports.getStudent = async function (req, res) {
  try {
    const getStudent = await Student.findOne({
      where: { id: req.params.studentId * 1 },
    });

    res.status(200).json({
      status: "success",
      data: {
        user: getStudent,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// // delete a user
exports.deleteStudent = async function (req, res) {
  try {
    const delStudent = await Student.destroy({
      where: { id: req.params.studentId * 1 },
    });

    res.status(200).json({
      status: "success",
      data: {
        user: `user ${req.params.studentId * 1} is deleted`,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// // get student image

// exports.getImage = async function (req, res) {
//   try {
//     // if(!req.body.studentId) req.

//     const getUserImage = await Student.findOne({
//       where: { image: req.params.image },
//     });

//     // const url = `localhost:8080/${getUserImage.image}`;
//     console.log(getUserImage.image);

//     res.set("Content-Type", "image/jpg");

//     res.status(200).send(getUserImage.image);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// update a student data
exports.updateStudent = async function (req, res) {
  //If a new profile pic is uploaded then process it first by deleting the old image file from disk
  if (req.file) {
    try {
      //find by id
      const oldStudentDetails = await Student.findOne({
        where: { id: req.params.studentId * 1 },
      });
      if (!oldStudentDetails) {
        res.status(500).send("Student not found!");
      }

      //if old image file exist then the delete file from directory
      if (fs.existsSync(oldStudentDetails.image)) {
        fs.unlink(oldStudentDetails.image, (err) => {
          if (err) {
            res.status(500).send("Failed to delete file..");
          } else {
            console.log("file deleted");
          }
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  // Update the database with new details
  const student = await Student.findOne({
    where: { id: req.params.studentId * 1 },
  });
  student.name = req.body.name;
  student.matric_no = req.body.matric_no;
  student.course = req.body.course;
  student.image = req.file?.filename;
  await student.save();
};

// // Get Student list or Search Student by rfid or studentid query parameters
exports.searchStudent = async (req, res) => {
  const name = req.query.name;
  const rfid = req.query.rfid_badge;

  // if either studenId or rfId query parameters is present
  if (name || rfid) {
    try {
      let getStudent;
      if (name && rfid) {
        getStudent = await Student.findOne({
          where: { name: name, rfid_badge: rfid },
        });
      } else if (name) {
        getStudent = await Student.findOne({ where: { name } });
      } else if (rfid) {
        getStudent = await Student.findOne({ where: { rfid_badge: rfid } });
      }
      return res.status(200).json({
        status: "success",
        data: {
          user: getStudent,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  // else return the whole Student list
  try {
    const getStudents = await Student.find();

    res.status(200).json({
      status: "success",
      data: {
        user: getStudents,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// // get all student
exports.getStudents = async function (req, res) {
  try {
    const getStudents = await Student.findAll();

    res.status(200).json({
      status: "success",
      data: {
        user: getStudents,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

arduinoPort.on("open", () => {
  console.log("serial port is connected");
});

arduinoPort.on("error", () => {
  console.log("serial port is not connected");
});
