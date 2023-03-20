const router = require("express").Router();

const getCoursesController = require("../controllers/courses");
const validate = require("../middleware/validate");
const auth = require("../middleware/authenticate.js");

router.get("/", auth.isAuthenticated, getCoursesController.getAllCourses);
router.get("/:id", auth.isAuthenticated, getCoursesController.getCourse);
router.post(
  "/",
  auth.isAuthenticated,
  validate.newCourse,
  getCoursesController.postCourse
);
router.put(
  "/:id",
  auth.isAuthenticated,
  validate.newCourse,
  getCoursesController.putCourse
);
router.delete("/:id", getCoursesController.deleteCourse);

module.exports = router;
