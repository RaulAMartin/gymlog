import type { Exercise } from "../types/gym";
import ExerciseCard from "./ExerciseCard";

type ExerciseListProps = {
  exercises: Exercise[];
};

function ExerciseList({ exercises }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <p className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        No hay ejercicios disponibles.
      </p>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </section>
  );
}

export default ExerciseList;
