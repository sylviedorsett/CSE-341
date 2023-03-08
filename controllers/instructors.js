const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//Function to GET all instructors from database
const getAllInstructors = async (req, res, next) => {
  const instructors = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("instructors")
    .find();
  instructors.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list);
  });
};

//Function to GET one course by ID from database
const getInstructor = async (req, res, next) => {
  const instructorId = new ObjectId(req.params.id);
  const instructor = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("instructors")
    .find({ _id: instructorId });
  instructor.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list[0]);
  });
};

//Function to POST a new instructor to the database
const postInstructor = async (req, res) => {
  //create body to hold data
  const newInstructor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    department: req.body.department,
    email: req.body.email,
    tenure: req.body.tenure,
    course: req.body.course,
  };
  const collection = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("instructors");
  collection
    .insertOne(newInstructor)
    .then((result) => {
      if (result.acknowledged) {
        const id = result.insertedId;
        console.log(id);
      }
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Function to update an instructor from the database
const putInstructor = async (req, res) => {
  //grab id
  const instructorId = new ObjectId(req.params.id);
  //create body to hold data
  const updatedData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    department: req.body.department,
    email: req.body.email,
    tenure: req.body.tenure,
    course: req.body.course,
  };
  const collection = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("instructors");
  collection
    .replaceOne({ _id: instructorId }, updatedData)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Function to delete instructor from database
const deleteInstructor = async (req, res) => {
  const instructorId = new ObjectId(req.params.id);
  const collection = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("instructors");
  collection
    .deleteOne({ _id: instructorId })
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getAllInstructors,
  getInstructor,
  postInstructor,
  putInstructor,
  deleteInstructor,
};
