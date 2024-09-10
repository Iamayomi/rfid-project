const { Sequelize } = require("sequelize");

require("dotenv").config({ path: "./config.env" });

const sequelize = process.env.NODE_ENV === 'production' ? new Sequelize(process.env.PG_URL, {dialect: "postgres"}) :  new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const connectDB = async function (params) {
  try {
    await sequelize.authenticate();
    console.log("Database Connected👍👍");
  } catch (err) {
    console.error("Error occur during connection🎆🎆🎆", err);
  }
};

connectDB();

module.exports = sequelize;
