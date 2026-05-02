import RMForm from "../components/RMForm";

function RMPage() {
  return (
    <section>
      <h1 className="text-4xl font-bold text-gray-900">Marcas RM</h1>

      <p className="mt-2 text-gray-600">
        Registro de marcas máximas y cálculo de pesos recomendados.
      </p>

      <div className="mt-6">
        <RMForm />
      </div>
    </section>
  );
}

export default RMPage;
