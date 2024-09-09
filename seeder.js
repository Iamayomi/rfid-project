const Student = require("./models/studentModel");

const fs = require("fs");

const jsonData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/data.json`, "utf-8")
);

const importData = async () => {
  try {
    await Student.bulkCreate(jsonData);
    console.log("Data uploaded succesfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const clearData = async () => {
  try {
    await Student.truncate();

    console.log("Data deleted succesfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "--delete") {
  clearData();
}

if (process.argv[2] === "--import") {
  importData();
}
