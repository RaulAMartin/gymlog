const exerciseService = require("../services/exerciseService");

function getExercises(req, res) {
  const exercises = exerciseService.getAllExercises();

  res.status(200).json(exercises);
}

function getExercise(req, res) {
  const exercise = exerciseService.getExerciseById(req.params.id);

  if (!exercise) {
    return res.status(404).json({
      message: "Ejercicio no encontrado.",
    });
  }

  res.status(200).json(exercise);
}

function createExercise(req, res) {
  const { name, muscleGroup, tags } = req.body;

  if (!name || !muscleGroup || !Array.isArray(tags) || tags.length === 0) {
    return res.status(400).json({
      message: "Los campos name, muscleGroup y tags son obligatorios.",
    });
  }

  const newExercise = exerciseService.createExercise({
    name,
    muscleGroup,
    tags,
  });

  res.status(201).json(newExercise);
}

function updateExercise(req, res) {
  const updatedExercise = exerciseService.updateExercise(req.params.id, req.body);

  if (!updatedExercise) {
    return res.status(404).json({
      message: "Ejercicio no encontrado.",
    });
  }

  res.status(200).json(updatedExercise);
}

function deleteExercise(req, res) {
  const deleted = exerciseService.deleteExercise(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      message: "Ejercicio no encontrado.",
    });
  }

  res.status(200).json({
    message: "Ejercicio eliminado correctamente.",
  });
}

module.exports = {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
};
