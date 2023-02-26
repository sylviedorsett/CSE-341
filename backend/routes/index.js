const express = require('express');
const router = express.Router();
const contacts = require('../contacts/contacts.json');

router.use('/contacts', contacts);

module.exports = router;
