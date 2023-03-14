//Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const {auth} = require("express-openid-connect");

const port = process.env.PORT || 3000;
const server = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: 'https://dev-48jg214t834p5k5w.us.auth0.com'
};

server.use(auth(config));
server.get('/profile', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
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
