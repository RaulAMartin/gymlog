import { useMemo } from "react";
import { useGymLog } from "../context/GymLogContext";

export function useSessions() {
  const { sessions } = useGymLog();

  const totalSessions = sessions.length;

  const totalExercisesDone = useMemo(() => {
    return sessions.reduce((total, session) => {
      return total + session.exercises.length;
    }, 0);
  }, [sessions]);

  const lastSession = useMemo(() => {
    return sessions[0] ?? null;
  }, [sessions]);

  const totalSets = useMemo(() => {
    return sessions.reduce((sessionTotal, session) => {
      const setsInSession = session.exercises.reduce(
        (exerciseTotal, exercise) => {
          return exerciseTotal + exercise.sets.length;
        },
        0
      );

      return sessionTotal + setsInSession;
    }, 0);
  }, [sessions]);

  return {
    sessions,
    totalSessions,
    totalExercisesDone,
    totalSets,
    lastSession,
  };
}
