require("dotenv").config();

const app = require("./lib/server");
const database = require("./lib/database");

database.init();

const port = process.env.PORT || 8081;

const server = app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);

module.exports = server;
