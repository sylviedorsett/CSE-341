const express = require('express');
const router = express.Router();

const route = require('./routes');
const swagger = require('./swagger')

router.use('/contacts', swagger);
router.use('/contacts', route);


module.exports = router