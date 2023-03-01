//DELETE Method
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const deleteContact = async (req, res) => {
    //Get the document id to delete
    const userId = new ObjectId(req.params.id);
    //grab the specific contact by it's ID
    const contact = await mongodb.getDb().db("PersonalAssignment_2").collection('contacts').find({_id: userId});
    //Use the deleteOne() method on the contact passing in the id
    contact.deleteOne(userId)
    .then(result => {
        res.sendStatus(200);
    })
    .catch(error => console.log(error))
};

module.exports = {deleteContact};