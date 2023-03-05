const express = require('express');
const router = express.Router();
const swagger = require('./swagger');
const route = require('./routes');


router.use('/', swagger);
router.use('/contacts', route);

module.exports = router;
