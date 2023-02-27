const express = require('express');
const router = express.Router();

const contacts_Controller = require('../controllers/contacts');

router.get('/', contacts_Controller.getAllContacts);
router.get('/:id', contacts_Controller.getOneContact);

module.exports = router;
