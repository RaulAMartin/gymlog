import { Link } from "react-router-dom";
import { useGymLog } from "../context/GymLogContext";
import { useSessions } from "../hooks/useSessions";

function DashboardPage() {
  const { exercises } = useGymLog();
  const { totalSessions, totalExercisesDone, totalSets, lastSession } =
    useSessions();

  return (
    <section>
      <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Resumen general de tus entrenamientos y ejercicios.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <article className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Ejercicios disponibles</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {exercises.length}
          </p>
        </article>

        <article className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Sesiones registradas</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {totalSessions}
          </p>
        </article>

        <article className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Ejercicios realizados</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {totalExercisesDone}
          </p>
        </article>

        <article className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Series registradas</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {totalSets}
          </p>
        </article>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Última sesión
          </h2>

          {lastSession ? (
            <div className="mt-4">
              <p className="font-medium text-gray-900">
                Fecha: {lastSession.date}
              </p>

              <p className="mt-1 text-gray-600">
                {lastSession.exercises.length} ejercicio/s registrados.
              </p>

              {lastSession.notes && (
                <p className="mt-1 text-gray-600">
                  Notas: {lastSession.notes}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">
              Todavía no has registrado ninguna sesión.
            </p>
          )}
        </article>

        <article className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Acciones rápidas
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/sessions/new"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Nueva sesión
            </Link>

            <Link
              to="/exercises"
              className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800"
            >
              Ver ejercicios
            </Link>

            <Link
              to="/history"
              className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-900 hover:bg-gray-300"
            >
              Ver historial
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DashboardPage;
