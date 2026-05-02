const exercises = require("../data/exercises");

function getAllExercises() {
  return exercises;
}

function getExerciseById(id) {
  return exercises.find((exercise) => exercise.id === id);
}

function createExercise(data) {
  const newExercise = {
    id: crypto.randomUUID(),
    name: data.name,
    muscleGroup: data.muscleGroup,
    tags: data.tags,
  };

  exercises.push(newExercise);

  return newExercise;
}

function updateExercise(id, data) {
  const exercise = getExerciseById(id);

  if (!exercise) {
    return null;
  }

  exercise.name = data.name ?? exercise.name;
  exercise.muscleGroup = data.muscleGroup ?? exercise.muscleGroup;
  exercise.tags = data.tags ?? exercise.tags;

  return exercise;
}

function deleteExercise(id) {
  const index = exercises.findIndex((exercise) => exercise.id === id);

  if (index === -1) {
    return false;
  }

  exercises.splice(index, 1);

  return true;
}

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};
