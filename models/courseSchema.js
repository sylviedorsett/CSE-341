const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseTitle:{type:String, required:true},
    courseNum: {type:Number, required:true},
    instructor: {type:String, required:true},
    classMax: {type:Number, required:true},
    currentEnrollment: {type:Number, required:true},
    startDate: {type:Date},
    endDate: {type:Date},
});

module.exports = mongoose.model("courseSchema", courseSchema);

