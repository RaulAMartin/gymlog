const rms = require("../data/rms");

function getAllRms() {
  return rms;
}

function getRmById(id) {
  return rms.find((rm) => rm.id === id);
}

function createOrUpdateRm(data) {
  const existingRm = rms.find((rm) => rm.exerciseId === data.exerciseId);

  if (existingRm) {
    existingRm.exerciseName = data.exerciseName;
    existingRm.rm = data.rm;
    existingRm.updatedAt = new Date().toISOString().split("T")[0];

    return existingRm;
  }

  const newRm = {
    id: crypto.randomUUID(),
    exerciseId: data.exerciseId,
    exerciseName: data.exerciseName,
    rm: data.rm,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  rms.push(newRm);

  return newRm;
}

function deleteRm(id) {
  const index = rms.findIndex((rm) => rm.id === id);

  if (index === -1) {
    return false;
  }

  rms.splice(index, 1);

  return true;
}

module.exports = {
  getAllRms,
  getRmById,
  createOrUpdateRm,
  deleteRm,
};
