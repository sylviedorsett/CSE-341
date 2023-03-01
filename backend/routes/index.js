const express = require('express');
const router = express.Router();

const route = require('./routes');


router.use('/contacts', route);


module.exports = router