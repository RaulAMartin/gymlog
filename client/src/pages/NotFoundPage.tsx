import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="rounded-xl bg-white p-8 text-center shadow-sm">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>

      <p className="mt-2 text-gray-600">
        La página que buscas no existe.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFoundPage;
