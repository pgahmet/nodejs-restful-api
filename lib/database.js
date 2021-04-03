const mongoose = require("mongoose");
require("dotenv").config();

const init = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to database:" + process.env.MONGODB_URL))
    .catch((error) => {
      console.error(error);
    });
};

const close = () => {
  mongoose.connection.close();
};

module.exports = { init, close };
