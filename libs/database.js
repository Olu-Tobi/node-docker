const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("../config/config");

const connectWithRetry = async () => {
  const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2`;
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Connected!"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = connectWithRetry;
