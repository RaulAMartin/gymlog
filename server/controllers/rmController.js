const rmService = require("../services/rmService");

function getRms(req, res) {
  const rms = rmService.getAllRms();

  res.status(200).json(rms);
}

function getRm(req, res) {
  const rm = rmService.getRmById(req.params.id);

  if (!rm) {
    return res.status(404).json({
      message: "RM no encontrado.",
    });
  }

  res.status(200).json(rm);
}

function createOrUpdateRm(req, res) {
  const { exerciseId, exerciseName, rm } = req.body;

  if (!exerciseId || !exerciseName || typeof rm !== "number" || rm <= 0) {
    return res.status(400).json({
      message: "Los campos exerciseId, exerciseName y rm válido son obligatorios.",
    });
  }

  const savedRm = rmService.createOrUpdateRm({
    exerciseId,
    exerciseName,
    rm,
  });

  res.status(201).json(savedRm);
}

function deleteRm(req, res) {
  const deleted = rmService.deleteRm(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      message: "RM no encontrado.",
    });
  }

  res.status(200).json({
    message: "RM eliminado correctamente.",
  });
}

module.exports = {
  getRms,
  getRm,
  createOrUpdateRm,
  deleteRm,
};
