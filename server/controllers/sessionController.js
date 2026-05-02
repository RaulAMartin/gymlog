const sessionService = require("../services/sessionService");

function getSessions(req, res) {
  const sessions = sessionService.getAllSessions();

  res.status(200).json(sessions);
}

function getSession(req, res) {
  const session = sessionService.getSessionById(req.params.id);

  if (!session) {
    return res.status(404).json({
      message: "Sesión no encontrada.",
    });
  }

  res.status(200).json(session);
}

function createSession(req, res) {
  const { date, exercises } = req.body;

  if (!date || !Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({
      message: "Los campos date y exercises son obligatorios.",
    });
  }

  const newSession = sessionService.createSession(req.body);

  res.status(201).json(newSession);
}

function updateSession(req, res) {
  const updatedSession = sessionService.updateSession(req.params.id, req.body);

  if (!updatedSession) {
    return res.status(404).json({
      message: "Sesión no encontrada.",
    });
  }

  res.status(200).json(updatedSession);
}

function deleteSession(req, res) {
  const deleted = sessionService.deleteSession(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      message: "Sesión no encontrada.",
    });
  }

  res.status(200).json({
    message: "Sesión eliminada correctamente.",
  });
}

module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
};
