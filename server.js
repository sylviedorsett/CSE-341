//Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const { auth } = require("express-openid-connect");

const port = process.env.PORT || 3000;
const server = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};

server.use(auth(config));
server.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

server
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use("/", require("./routes/index.js"));

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log("Something went wrong.", err);
  } else {
    server.listen(port);
    console.log("Connected to database.");
  }
});
