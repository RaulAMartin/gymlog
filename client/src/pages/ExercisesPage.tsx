import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import ExerciseList from "../components/ExerciseList";
import Input from "../components/Input";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGymLog } from "../context/GymLogContext";
import ExerciseForm from "../components/ExerciseForm";
import AnimatedPage from "../components/AnimatedPage";

function ExercisesPage() {
  const {
    filteredExercises,
    availableTags,
    search,
    selectedTag,
    isLoading,
    error,
    setSearch,
    setSelectedTag,
    clearFilters,
  } = useGymLog();

  return (
    <AnimatedPage>
      <section>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Ejercicios
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Biblioteca de ejercicios con búsqueda y filtros por tags.
        </p>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <ExerciseForm />

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <Input
              label="Buscar ejercicio"
              value={search}
              placeholder="Ej: press banca"
              onChange={setSearch}
            />

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filtrar por tag
              </span>

              <select
                value={selectedTag}
                onChange={(event) => setSelectedTag(event.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="">Todos</option>

                {availableTags.map((tag) => (
                  <option
                    key={tag}
                    value={tag}
                    className="dark:bg-gray-900 dark:text-gray-100"
                  >
                    {tag}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              <Button onClick={clearFilters}>Limpiar filtros</Button>
            </div>
          </div>

          {isLoading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} />}

          {!isLoading && !error && (
            <ExerciseList exercises={filteredExercises} />
          )}
        </div>
      </section>
    </AnimatedPage>
  );
}

export default ExercisesPage;
