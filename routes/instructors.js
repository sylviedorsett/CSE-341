const router = require("express").Router();

const getInstructorsController = require("../controllers/instructors");

router.get("/", getInstructorsController.getAllInstructors);
router.get("/:id", getInstructorsController.getInstructor);
router.post("/:id", getInstructorsController.postInstructor);
router.put("/:id", getInstructorsController.putInstructor);
router.delete("/:id", getInstructorsController.deleteInstructor);

module.exports = router;
