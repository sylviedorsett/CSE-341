const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const instructorSchema = require("../models/instructorSchema");

//Function to GET all instructors from database
const getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("instructors")
      .find();
    try {
      instructors.toArray().then((list) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } catch (error) {
    res
      .satus(500)
      .json(
        response.error || "An internal error occurred. Please try again later."
      );
  }
};

//Function to GET one course by ID from database
const getInstructor = async (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    const instructorId = new ObjectId(req.params.id);
    const instructor = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("instructors")
      .find({ _id: instructorId });
    try {
      instructor.toArray().then((list) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list[0]);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    res.status(400).json("Invalid ID entered. Please try again.");
  }
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

  try {
    const response = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("instructors")
      .insertOne(newInstructor);
    if (response.acknowledged) {
      console.log(response.insertedId);
      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(response.error || "An error occurred. Pleaset try again.");
  }
};

//Function to update an instructor from the database
const putInstructor = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const instructorId = new ObjectId(req.params.id);

    const updatedData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      email: req.body.email,
      tenure: req.body.tenure,
      course: req.body.course,
    };

    const response = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("instructors")
      .replaceOne({ _id: instructorId }, updatedData);
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "An error occurred. Please try again.");
    }
  } else {
    res.status(400).json("Invalid ID entered. Please try again.");
  }
};

//Function to delete instructor from database
const deleteInstructor = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const instructorId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("instructors")
      .deleteOne({ _id: instructorId });
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Unable to delete course. Please try again.");
    }
  } else {
    res.status(400).json("Invalid ID entered. Please try again.");
  }
};

module.exports = {
  getAllInstructors,
  getInstructor,
  postInstructor,
  putInstructor,
  deleteInstructor,
};
