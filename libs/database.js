const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("../config/config");

const mongoURL = `mongodb://tobi:samuel@ElasticIP:27017/?authSource=admin`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

// module.exports = connectWithRetry;
