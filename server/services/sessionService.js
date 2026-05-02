const sessions = require("../data/sessions");

function getAllSessions() {
  return sessions;
}

function getSessionById(id) {
  return sessions.find((session) => session.id === id);
}

function createSession(data) {
  const newSession = {
    id: crypto.randomUUID(),
    date: data.date,
    notes: data.notes ?? "",
    exercises: data.exercises,
  };

  sessions.push(newSession);

  return newSession;
}

function updateSession(id, data) {
  const session = getSessionById(id);

  if (!session) {
    return null;
  }

  session.date = data.date ?? session.date;
  session.notes = data.notes ?? session.notes;
  session.exercises = data.exercises ?? session.exercises;

  return session;
}

function deleteSession(id) {
  const index = sessions.findIndex((session) => session.id === id);

  if (index === -1) {
    return false;
  }

  sessions.splice(index, 1);

  return true;
}

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};
