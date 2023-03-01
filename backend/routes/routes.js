const express = require('express');
const router = express.Router();

//Connect the route to the getContacts Controller
const getContactsController = require('../controllers/getContacts');
router.get('/', getContactsController.getAllContacts);
router.get('/:id', getContactsController.getOneContact);

//Conect the route to the postContacts Controller
const postContactsController = require('../controllers/postContacts');
router.get('/', postContactsController.createContact);

//Connect the route to the putContacts Controller
const putContactsController = require('../controllers/putContacts');
router.get('/:id', putContactsController.updateContact);

//Connect the route to the deleteContacts Controller
const deleteContactsController = require('../controllers/deleteContacts');
router.get('/:id', deleteContactsController.deleteContact);

module.exports = router;