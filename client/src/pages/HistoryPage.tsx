import AnimatedPage from "../components/AnimatedPage";
import SessionCard from "../components/SessionCard";
import { useGymLog } from "../context/GymLogContext";
import { useSessions } from "../hooks/useSessions";

function HistoryPage() {
  const { sessions } = useSessions();
  const { addSession, removeSession } = useGymLog();

  async function repeatSession(sessionId: string) {
    const sessionToRepeat = sessions.find((session) => session.id === sessionId);

    if (!sessionToRepeat) {
      return;
    }

    await addSession({
      date: new Date().toISOString().split("T")[0],
      notes: `Sesión repetida de ${sessionToRepeat.date}`,
      exercises: sessionToRepeat.exercises,
    });
  }

  async function deleteSession(sessionId: string) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta sesión?"
    );

    if (!confirmDelete) {
      return;
    }

    await removeSession(sessionId);
  }

  return (
    <AnimatedPage>
    <section>
      <h1 className="text-4xl font-bold text-gray-900">Historial</h1>

      <p className="mt-2 text-gray-600">
        Consulta, edita, repite o elimina tus sesiones de entrenamiento.
      </p>

      <div className="mt-6">
        {sessions.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">
            Todavía no hay sesiones registradas. Crea una desde la página Nueva
            sesión.
          </p>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onRepeat={() => repeatSession(session.id)}
                onDelete={() => deleteSession(session.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
    </AnimatedPage>
  );
}

export default HistoryPage;
