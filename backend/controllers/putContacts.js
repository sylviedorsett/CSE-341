//POST Method
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const updateContact = async (req, res, oldKey, oldValue, newKey, newValue) => {
   //Get the id of the contact to update
    const userId = new ObjectId(req.params.id);

    //Create a request body to hold the updated info
    const updatedData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    //Grab the document from the database by it's ID
    const result = await mongodb.getDb().db("PersonalAssignment_2").collection('contacts').find({_id: userId});
    
    //Use the updateOne() method and pass in the updated contact
    result.updateOne(updatedData)
    .then(result => {
        res.sendStatus(204);
    })
    .catch(error => console.log(error))
};

module.exports = {updateContact};
