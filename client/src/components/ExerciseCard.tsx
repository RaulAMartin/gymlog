import type { Exercise } from "../types/gym";
import { useGymLog } from "../context/GymLogContext";
import { motion } from "motion/react";

type ExerciseCardProps = {
  exercise: Exercise;
};


function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { rms } = useGymLog();
  const exerciseRm = rms.find((rm) => rm.exerciseId === exercise.id);
  return (
    <motion.article
  initial={{ opacity: 0, scale: 0.97 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
  >
      <h3 className="text-lg font-bold text-gray-900">{exercise.name}</h3>

      <p className="mt-1 text-sm text-gray-600">
        Grupo muscular: {exercise.muscleGroup}
      </p>

      {exerciseRm ? (
     <p className="mt-2 rounded-lg bg-blue-50 p-2 text-sm font-medium text-blue-700">
       RM actual: {exerciseRm.rm} kg
     </p>
    ) : (
     <p className="mt-2 rounded-lg bg-gray-50 p-2 text-sm text-gray-500">
          Sin RM registrado
     </p>
    )}

      <div className="mt-3 flex flex-wrap gap-2">
        {exercise.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default ExerciseCard;
