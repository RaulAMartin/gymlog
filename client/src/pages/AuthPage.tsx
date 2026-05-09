import { useState } from "react";
import { Navigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const { user, signIn, signUp } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setError("El email es obligatorio.");
      return;
    }

    if (!password.trim()) {
      setError("La contraseña es obligatoria.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      if (mode === "register") {
        if (!username.trim()) {
          setError("El nombre de usuario es obligatorio.");
          return;
        }

        await signUp(email.trim(), password, username.trim());

        setSuccessMessage(
          "Registro completado. Revisa tu correo si Supabase pide confirmación."
        );
      } else {
        await signIn(email.trim(), password);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo completar la autenticación."
      );
    }
  }

  return (
    <AnimatedPage>
      <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Accede para guardar tus ejercicios, sesiones y marcas RM.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "register" && (
            <Input
              label="Nombre de usuario"
              value={username}
              placeholder="Ej: raul"
              onChange={setUsername}
            />
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="tuemail@email.com"
            onChange={setEmail}
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            placeholder="Mínimo 6 caracteres"
            onChange={setPassword}
          />

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
              {successMessage}
            </p>
          )}

          <Button type="submit">
            {mode === "login" ? "Entrar" : "Registrarme"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode((currentMode) =>
              currentMode === "login" ? "register" : "login"
            );
            setError("");
            setSuccessMessage("");
          }}
          className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {mode === "login"
            ? "¿No tienes cuenta? Crear cuenta"
            : "¿Ya tienes cuenta? Iniciar sesión"}
        </button>
      </section>
    </AnimatedPage>
  );
}

export default AuthPage;
