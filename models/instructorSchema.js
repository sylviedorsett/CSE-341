const mongoose = require("mongoose");
//const courseSchema = require("../models/courseSchema");

const instructorSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: Array, required: true },
  email: { type: String, unique: true, required: true },
  tenure: { type: Boolean, required: true },
  course: {type: String, required: true}
  //course: [courseSchema],
});

module.exports = mongoose.model("instructorSchema", instructorSchema);
