import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { mockExercises } from "../data/mockExercises";
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
    try {
      setIsLoading(true);

      setTimeout(() => {
        setExercises(mockExercises);
        setIsLoading(false);
      }, 500);
    } catch {
      setError("No se pudieron cargar los ejercicios.");
      setIsLoading(false);
    }
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
