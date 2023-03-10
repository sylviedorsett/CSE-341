const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//Function to GET all coures from database
const getAllCourses = async (req, res, next) => {
  const courses = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("courses")
    .find();
  courses.toArray((err, list) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list);
  });
};

//Function to GET one course by ID from database
const getCourse = async (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    const courseId = new ObjectId(req.params.id);
    const course = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("courses")
      .find({ _id: courseId });
    course.toArray((err, list) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(list[0]);
    });
  } else {
    res.status(400).json("Invalid ID entered. Please try again.");
  }
};

//Function to POST a new course to the database
const postCourse = async (req, res) => {
  //Create body to hold data
  const newCourse = {
    courseTitle: req.body.courseTitle,
    courseId: req.body.courseId,
    instructor: req.body.instructor,
    classMax: req.body.classMax,
    currentEnrollment: req.body.currentEnrollment,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  try {
    const response = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("courses")
      .insertOne(newCourse);
    if (response.acknowledged) {
      console.log(response.insertedId);
      res.sendStatus(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(response.error || "An error occurred. Please try again.");
  }
};

//Function to update a course from the database
const putCourse = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const courseId = new ObjectId(req.params.id);

    const updatedData = {
      courseTitle: req.body.courseTitle,
      courseId: req.body.courseId,
      instructor: req.body.instructor,
      classMax: req.body.classMax,
      currentEnrollment: req.body.currentEnrollment,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };

    const response = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("courses")
      .replaceOne({ _id: courseId }, updatedData);
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

//Function to delete course from database
const deleteCourse = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const courseId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("PersonalAssignment5")
      .collection("courses")
      .deleteOne({ _id: courseId });
    if (response.deletedCount > 0) {
      res.status(200);
    } else {
      res
        .status(500)
        .json(response.error || "Unable to delete contact. Please try again.");
    }
  } else {
    res.status(400).json("Invalid ID entered. Please try again.");
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  postCourse,
  putCourse,
  deleteCourse,
};
