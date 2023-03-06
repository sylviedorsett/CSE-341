//Import Express, MongoDB and Body-Parser
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./backend/db/connect');


//Create a Port, ensure it directs to the environment variables OR the port you want
const port = process.env.PORT || 3000;

//Create an instance of the Express server
const app = express();


//Tell the instance of the server to 'use' (an express method) a body-parser module
app.use(bodyParser.json());

//Set response header to '*' so it won't get blocked by CORS
app.use((req, res, next) => {
  res.setHeader('Access-Controll-Allow-Origin', '*');
  res.setHeader(
    'Acess-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
  next();
}).use('/', require('./backend/routes/index.js'));

//Direct the app to the routes entry point


//Connect to the database
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log('Something went wrong.', err);
  } else {
    app.listen(port);
    console.log(`Connected to DB.`);
  }
});
