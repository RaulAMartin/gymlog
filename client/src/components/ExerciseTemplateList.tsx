import { useEffect, useState } from "react";
import { useGymLog } from "../context/GymLogContext";
import {
  getExerciseTemplates,
  type ExerciseTemplate,
} from "../services/exerciseTemplateSupabaseService";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

function ExerciseTemplateList() {
  const { addExercise, exercises } = useGymLog();

  const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadTemplates() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getExerciseTemplates();

        setTemplates(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los ejercicios base."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadTemplates();
  }, []);

  async function importTemplate(template: ExerciseTemplate) {
    setError("");
    setSuccessMessage("");

    const alreadyExists = exercises.some(
      (exercise) =>
        exercise.name.toLowerCase() === template.name.toLowerCase()
    );

    if (alreadyExists) {
      setError("Ese ejercicio ya está en tu biblioteca.");
      return;
    }

    await addExercise({
      name: template.name,
      muscleGroup: template.muscleGroup,
      tags: template.tags,
    });

    setSuccessMessage(`${template.name} importado correctamente.`);
  }

  return (
    <section className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Ejercicios base
      </h2>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Puedes importar ejercicios predefinidos a tu biblioteca personal.
      </p>

      {isLoading && (
        <div className="mt-4">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {successMessage && (
        <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          {successMessage}
        </p>
      )}

      {!isLoading && templates.length > 0 && (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              {template.imageUrl && (
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="mb-3 h-32 w-full rounded-lg object-cover"
                />
              )}

              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                {template.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Grupo muscular: {template.muscleGroup}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <Button onClick={() => importTemplate(template)}>
                  Importar
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExerciseTemplateList;
