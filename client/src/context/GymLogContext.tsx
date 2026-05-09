import { useAuth } from "./AuthContext";
import {
  createSupabaseExercise,
  getSupabaseExercises,
} from "../services/exerciseSupabaseService";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createOrUpdateRm,
  createSession,
  deleteSession,
  getRms,
  getSessions,
  updateSession,
} from "../api/client";

import type { Exercise, ExerciseRM, TrainingSession } from "../types/gym";

type GymLogContextValue = {
  exercises: Exercise[];
  sessions: TrainingSession[];
  rms: ExerciseRM[];
  filteredExercises: Exercise[];
  availableTags: string[];
  search: string;
  selectedTag: string;
  isLoading: boolean;
  error: string;
  setSearch: (value: string) => void;
  setSelectedTag: (value: string) => void;
  clearFilters: () => void;
  addExercise: (exercise: Omit<Exercise, "id">) => Promise<void>;
  addSession: (session: Omit<TrainingSession, "id">) => Promise<void>;
  editSession: (
    id: string,
    session: Partial<TrainingSession>
  ) => Promise<void>;
  removeSession: (id: string) => Promise<void>;
  addOrUpdateRm: (rm: Omit<ExerciseRM, "id" | "updatedAt">) => Promise<void>;
};

type GymLogProviderProps = {
  children: React.ReactNode;
};

const GymLogContext = createContext<GymLogContextValue | undefined>(undefined);

export function GymLogProvider({ children }: GymLogProviderProps) {
  const { user, isAuthLoading } = useAuth();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [rms, setRms] = useState<ExerciseRM[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      if (isAuthLoading) {
        return;
      }

      if (!user) {
        setExercises([]);
        setSessions([]);
        setRms([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const [exercisesData, sessionsData, rmsData] = await Promise.all([
          getSupabaseExercises(user.id),
          getSessions(),
          getRms(),
        ]);

        setExercises(exercisesData);
        setSessions(sessionsData);
        setRms(rmsData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los datos."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [user, isAuthLoading]);

  const availableTags = useMemo(() => {
    const tags = exercises.flatMap((exercise) => exercise.tags);
    return Array.from(new Set(tags));
  }, [exercises]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesSearch = exercise.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTag = selectedTag
        ? exercise.tags.includes(selectedTag)
        : true;

      return matchesSearch && matchesTag;
    });
  }, [exercises, search, selectedTag]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setSelectedTag("");
  }, []);

  const addExercise = useCallback(
    async (exercise: Omit<Exercise, "id">) => {
      if (!user) {
        setError("Debes iniciar sesión para crear ejercicios.");
        return;
      }

      try {
        setError("");

        const newExercise = await createSupabaseExercise(user.id, exercise);

        setExercises((currentExercises) => [
          newExercise,
          ...currentExercises,
        ]);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudo crear el ejercicio."
        );
      }
    },
    [user]
  );

  const addSession = useCallback(
    async (session: Omit<TrainingSession, "id">) => {
      try {
        setError("");

        const newSession = await createSession(session);

        setSessions((currentSessions) => [newSession, ...currentSessions]);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudo guardar la sesión."
        );
      }
    },
    []
  );

  const editSession = useCallback(
    async (id: string, session: Partial<TrainingSession>) => {
      try {
        setError("");

        const updatedSession = await updateSession(id, session);

        setSessions((currentSessions) =>
          currentSessions.map((currentSession) =>
            currentSession.id === id ? updatedSession : currentSession
          )
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudo actualizar la sesión."
        );
      }
    },
    []
  );

  const removeSession = useCallback(async (id: string) => {
    try {
      setError("");

      await deleteSession(id);

      setSessions((currentSessions) =>
        currentSessions.filter((session) => session.id !== id)
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la sesión."
      );
    }
  }, []);

  const addOrUpdateRm = useCallback(
    async (rm: Omit<ExerciseRM, "id" | "updatedAt">) => {
      try {
        setError("");

        const savedRm = await createOrUpdateRm(rm);

        setRms((currentRms) => {
          const exists = currentRms.some(
            (currentRm) => currentRm.exerciseId === savedRm.exerciseId
          );

          if (exists) {
            return currentRms.map((currentRm) =>
              currentRm.exerciseId === savedRm.exerciseId ? savedRm : currentRm
            );
          }

          return [...currentRms, savedRm];
        });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "No se pudo guardar el RM."
        );
      }
    },
    []
  );

  const value: GymLogContextValue = {
    exercises,
    sessions,
    rms,
    filteredExercises,
    availableTags,
    search,
    selectedTag,
    isLoading,
    error,
    setSearch,
    setSelectedTag,
    clearFilters,
    addExercise,
    addSession,
    editSession,
    removeSession,
    addOrUpdateRm,
  };

  return (
    <GymLogContext.Provider value={value}>{children}</GymLogContext.Provider>
  );
}

export function useGymLog() {
  const context = useContext(GymLogContext);

  if (!context) {
    throw new Error("useGymLog debe usarse dentro de GymLogProvider");
  }

  return context;
}
