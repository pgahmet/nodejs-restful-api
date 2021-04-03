const mongoose = require("mongoose");
require("dotenv").config();

const init = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to db"))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};

const close = () => {
  mongoose.connection.close();
};

module.exports = { init, close };
