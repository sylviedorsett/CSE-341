//Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");

const port = process.env.PORT || 3000;
const server = express();

server
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
  })
  .use("/", require("./routes/index.js"));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log("Something went wrong.", err);
  } else {
    server.listen(port);
    console.log("Connected to database.");
  }
});
