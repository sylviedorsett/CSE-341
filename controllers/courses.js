const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//Function to GET all coures from database
const getAllCourses = async (req, res, next) => {
  const courses = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("courses")
    .find();
  courses.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list);
  });
};

//Function to GET one course by ID from database
const getCourse = async (req, res, next) => {
  const courseId = new ObjectId(req.params.id);
  const course = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("courses")
    .find({ _id: courseId });
  course.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list[0]);
  });
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
  const collection = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("courses");
  collection
    .insertOne(newCourse)
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

//Function to update a course from the database
const putCourse = async (req, res) => {
  //grab id
  const courseId = new ObjectId(req.params.id);
  //Create body to hold data
  const updatedData = {
    courseTitle: req.body.courseTitle,
    courseId: req.body.courseId,
    instructor: req.body.instructor,
    classMax: req.body.classMax,
    currentEnrollment: req.body.currentEnrollment,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  const collection = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("courses");
  collection
    .replaceOne({ _id: courseId }, updatedData)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Function to delete course from database
const deleteCourse = async (req, res) => {
  const courseId = new ObjectId(req.params.id);
  const collection = await mongodb
    .getDb()
    .db("PersonalAssignment5")
    .collection("courses");
  collection
    .deleteOne({ _id: courseId })
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getAllCourses,
  getCourse,
  postCourse,
  putCourse,
  deleteCourse,
};
