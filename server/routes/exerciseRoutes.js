const express = require("express");
const exerciseController = require("../controllers/exerciseController");

const router = express.Router();

router.get("/", exerciseController.getExercises);
router.get("/:id", exerciseController.getExercise);
router.post("/", exerciseController.createExercise);
router.put("/:id", exerciseController.updateExercise);
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
