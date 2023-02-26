const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./backend/db/connect');

const port = process.env.PORT || 3000;
const app = express();

app.use('/', require('./backend/routes'));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    next();
});

mongodb.initDb((err, mongodb) => {
    if(err) {
        console.log('Something went wrong.', error);
    }
    else {
        app.listen(port);
        console.log(`Connected to DB.`);
    }
});


