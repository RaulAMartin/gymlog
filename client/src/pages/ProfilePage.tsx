import { useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  updateProfile,
  type UserProfile,
} from "../services/profileSupabaseService";

function ProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const data = await getProfile(user.id);

        setProfile(data);
        setUsername(data?.username ?? "");
        setFullName(data?.fullName ?? "");
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudo cargar el perfil."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      return;
    }

    setError("");
    setSuccessMessage("");

    if (!username.trim()) {
      setError("El nombre de usuario es obligatorio.");
      return;
    }

    try {
      const updatedProfile = await updateProfile(user.id, {
        username: username.trim(),
        fullName: fullName.trim(),
      });

      setProfile(updatedProfile);
      setSuccessMessage("Perfil actualizado correctamente.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el perfil."
      );
    }
  }

  return (
    <AnimatedPage>
      <section>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Mi perfil
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Gestiona tus datos de usuario.
        </p>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          {isLoading ? (
            <p className="text-gray-600 dark:text-gray-300">
              Cargando perfil...
            </p>
          ) : (
            <>
              <div className="mb-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {user?.email}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre de usuario"
                  value={username}
                  placeholder="Ej: raul"
                  onChange={setUsername}
                />

                <Input
                  label="Nombre completo"
                  value={fullName}
                  placeholder="Ej: Raúl Martín"
                  onChange={setFullName}
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

                <Button type="submit">Guardar perfil</Button>
              </form>

              {profile && (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  ID de usuario: {profile.id}
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
}

export default ProfilePage;
