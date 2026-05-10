import type { Exercise } from "../types/gym";
import { useGymLog } from "../context/GymLogContext";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

type ExerciseCardProps = {
  exercise: Exercise;
};

function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { rms, removeExercise } = useGymLog();

  const exerciseRm = rms.find((rm) => rm.exerciseId === exercise.id);

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        dark:border-gray-700
        dark:bg-gray-800
      "
    >
      {exercise.imageUrl && (
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="mb-3 h-36 w-full rounded-lg object-cover"
        />
      )}
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {exercise.name}
      </h3>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        Grupo muscular: {exercise.muscleGroup}
      </p>

      {exerciseRm ? (
        <p
          className="
            mt-2
            rounded-lg
            bg-blue-50
            p-2
            text-sm
            font-medium
            text-blue-700
            dark:bg-blue-900/30
            dark:text-blue-300
          "
        >
          RM actual: {exerciseRm.rm} kg
        </p>
      ) : (
        <p
          className="
            mt-2
            rounded-lg
            bg-gray-50
            p-2
            text-sm
            text-gray-500
            dark:bg-gray-700
            dark:text-gray-300
          "
        >
          Sin RM registrado
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2">
  <Link
    to={`/sessions/new?exerciseId=${exercise.id}`}
    className="rounded-lg bg-blue-600 px-2 py-2 text-center text-xs font-medium text-white hover:bg-blue-700"
  >
    Usar sesión
  </Link>

  <Link
    to={`/rm?exerciseId=${exercise.id}`}
    className="rounded-lg bg-gray-900 px-2 py-2 text-center text-xs font-medium text-white hover:bg-gray-800"
  >
    Registrar RM
  </Link>

  <button
    type="button"
    onClick={() => removeExercise(exercise.id)}
    className="rounded-lg bg-red-600 px-2 py-2 text-xs font-medium text-white hover:bg-red-700"
  >
    Eliminar
  </button>
</div>

    </motion.article>
  );
}

export default ExerciseCard;
