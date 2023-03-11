const router = require("express").Router();

const getCoursesController = require("../controllers/courses");
const validate = require("../middleware/validate");

router.get("/", getCoursesController.getAllCourses);
router.get("/:id", getCoursesController.getCourse);
router.post("/", validate.saveCourse, getCoursesController.postCourse);
router.put("/:id", validate.saveCourse, getCoursesController.putCourse);
router.delete("/:id", getCoursesController.deleteCourse);

module.exports = router;
