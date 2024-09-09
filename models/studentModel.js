const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Student = sequelize.define(
  "student",
  {
    name: DataTypes.STRING,
    rfid_badge: DataTypes.STRING,
    course: DataTypes.STRING,
    image: DataTypes.STRING,
    matric_no: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

(async function () {
  try {
    // await sequelize.sync({force: true});
    await sequelize.sync({ alter: true });
    console.log("Student Model synced");
  } catch (err) {
    console.error("Error syncing Model");
  }
})();

module.exports = Student;
