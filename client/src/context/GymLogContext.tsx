import { useAuth } from "./AuthContext";
import {
  createSupabaseExercise,
  getSupabaseExercises,
  deleteSupabaseExercise,
} from "../services/exerciseSupabaseService";
import {
  createOrUpdateSupabaseRm,
  getSupabaseRms,
} from "../services/rmSupabaseService";

import {
  createSupabaseSession,
  deleteSupabaseSession,
  getSupabaseSessions,
  updateSupabaseSession,
} from "../services/sessionSupabaseService";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Exercise, ExerciseRM, TrainingSession } from "../types/gym";

type GymLogContextValue = {
  removeExercise: (id: string) => Promise<void>;
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
  getSupabaseSessions(user.id),
  getSupabaseRms(user.id),
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
    if (!user) {
      setError("Debes iniciar sesión para guardar sesiones.");
      return;
    }

    try {
      setError("");

      const newSession = await createSupabaseSession(user.id, session);

      setSessions((currentSessions) => [newSession, ...currentSessions]);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar la sesión."
      );
    }
  },
  [user]
);

  const editSession = useCallback(
  async (id: string, session: Partial<TrainingSession>) => {
    if (!user) {
      setError("Debes iniciar sesión para editar sesiones.");
      return;
    }

    try {
      setError("");

      const updatedSession = await updateSupabaseSession(
        user.id,
        id,
        session
      );

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
  [user]
);

  const removeSession = useCallback(
  async (id: string) => {
    if (!user) {
      setError("Debes iniciar sesión para eliminar sesiones.");
      return;
    }

    try {
      setError("");

      await deleteSupabaseSession(user.id, id);

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
  },
  [user]
);

  const addOrUpdateRm = useCallback(
  async (rm: Omit<ExerciseRM, "id" | "updatedAt">) => {
    if (!user) {
      setError("Debes iniciar sesión.");
      return;
    }

    try {
      setError("");

      const savedRm = await createOrUpdateSupabaseRm(user.id, rm);

      setRms((currentRms) => {
        const exists = currentRms.some(
          (currentRm) => currentRm.exerciseId === savedRm.exerciseId
        );

        if (exists) {
          return currentRms.map((currentRm) =>
            currentRm.exerciseId === savedRm.exerciseId
              ? savedRm
              : currentRm
          );
        }

        return [...currentRms, savedRm];
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el RM."
      );
    }
  },
  [user]
  );

  const removeExercise = useCallback(
  async (id: string) => {
    if (!user) {
      setError("Debes iniciar sesión para eliminar ejercicios.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este ejercicio?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await deleteSupabaseExercise(user.id, id);

      setExercises((currentExercises) =>
        currentExercises.filter((exercise) => exercise.id !== id)
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el ejercicio."
      );
    }
  },
  [user]
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
    removeExercise,
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
