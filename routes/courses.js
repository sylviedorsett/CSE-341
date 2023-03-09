const router = require("express").Router();

const getCoursesController = require("../controllers/courses");

router.get("/", getCoursesController.getAllCourses);
router.get("/:id", getCoursesController.getCourse);
router.post("/", getCoursesController.postCourse);
router.put("/:id", getCoursesController.putCourse);
router.delete("/:id", getCoursesController.deleteCourse);

module.exports = router;
