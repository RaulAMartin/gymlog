import SessionForm from "../components/SessionForm";

function NewSessionPage() {
  return (
    <section>
      <h1 className="text-4xl font-bold text-gray-900">Nueva sesión</h1>

      <p className="mt-2 text-gray-600">
        Registra una nueva sesión de entrenamiento.
      </p>

      <div className="mt-6">
        <SessionForm />
      </div>
    </section>
  );
}

export default NewSessionPage;
