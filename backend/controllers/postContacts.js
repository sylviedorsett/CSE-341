//POST Method
const mongodb = require('../db/connect');

const createContact = async (req, res) => {
    //Create body to hold the data passed with the POST HTTP Request
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    //grab the collection
    const data = await mongodb.getDb().db("PersonalAssignment_2").collection('contacts');
    //Use the insertOne() method on the data to add the POST request
    data.insertOne(newContact)
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => console.log(error))
};

module.exports = {createContact};
