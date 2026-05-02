import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createExercise, getExercises } from "../api/client";
import type { Exercise } from "../types/gym";

type GymLogContextValue = {
  exercises: Exercise[];
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
};

type GymLogProviderProps = {
  children: React.ReactNode;
};

const GymLogContext = createContext<GymLogContextValue | undefined>(undefined);

export function GymLogProvider({ children }: GymLogProviderProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  async function loadExercises() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getExercises();

      setExercises(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los ejercicios."
      );
    } finally {
      setIsLoading(false);
    }
  }

  loadExercises();
  }, []);

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

  const addExercise = useCallback(async (exercise: Omit<Exercise, "id">) => {
  try {
    setError("");

    const newExercise = await createExercise(exercise);

    setExercises((currentExercises) => [...currentExercises, newExercise]);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "No se pudo crear el ejercicio."
    );
  }
  }, []);

  const value: GymLogContextValue = {
    exercises,
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
