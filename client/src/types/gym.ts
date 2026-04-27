export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  tags: string[];
};

export type TrainingSet = {
  reps: number;
  weight: number;
};

export type SessionExercise = {
  exerciseId: string;
  exerciseName: string;
  sets: TrainingSet[];
};

export type TrainingSession = {
  id: string;
  date: string;
  notes?: string;
  exercises: SessionExercise[];
};

export type ExerciseRM = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  rm: number;
  updatedAt: string;
};

export type WeightRecommendation = {
  label: string;
  percentage: number;
  weight: number;
};
