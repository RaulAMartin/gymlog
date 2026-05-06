import type { TrainingSession } from "../types/gym";

type SessionCardProps = {
  session: TrainingSession;
  onRepeat?: () => void;
};

function SessionCard({ session, onRepeat }: SessionCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Sesión del {session.date}
          </h2>

          {session.notes && (
            <p className="mt-1 text-sm text-gray-600">{session.notes}</p>
          )}
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {session.exercises.length} ejercicio/s
        </span>
      </div>

      {onRepeat && (
    <button
     type="button"
      onClick={onRepeat}
     className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
    Repetir sesión hoy
     </button>
    )}

      <div className="mt-4 space-y-3">
        {session.exercises.map((exercise) => (
          <div
            key={exercise.exerciseId}
            className="rounded-lg bg-gray-50 p-3"
          >
            <h3 className="font-semibold text-gray-900">
              {exercise.exerciseName}
            </h3>

            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {exercise.sets.map((set, index) => (
                <li key={index}>
                  Serie {index + 1}: {set.reps} reps x {set.weight} kg
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

export default SessionCard;
