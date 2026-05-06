import SessionCard from "../components/SessionCard";
import { useSessions } from "../hooks/useSessions";
import { useGymLog } from "../context/GymLogContext";

function HistoryPage() {
  const { sessions } = useSessions();
  const { addSession } = useGymLog();

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

  return (
    <section>
      <h1 className="text-4xl font-bold text-gray-900">Historial</h1>

      <p className="mt-2 text-gray-600">
        Consulta las sesiones de entrenamiento que has registrado.
      </p>

      <div className="mt-6">
        {sessions.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">
            Todavía no hay sesiones registradas. Crea una desde la página
            Nueva sesión.
          </p>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onRepeat={() => repeatSession(session.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HistoryPage;
