import Button from "./components/Button";
import ErrorMessage from "./components/ErrorMessage";
import ExerciseList from "./components/ExerciseList";
import Input from "./components/Input";
import LoadingSpinner from "./components/LoadingSpinner";
import WeightRecommendationCard from "./components/WeightRecommendationCard";
import { useExercises } from "./hooks/useExercises";
import { calculateWeightRecommendations } from "./utils/calculateWeights";

const recommendations = calculateWeightRecommendations(100);

function App() {
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
  } = useExercises();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">GymLog</h1>
          <p className="mt-2 text-gray-600">
            Registro de entrenamientos, ejercicios y marcas personales.
          </p>
        </header>

        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Biblioteca de ejercicios
          </h2>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <Input
              label="Buscar ejercicio"
              value={search}
              placeholder="Ej: press banca"
              onChange={setSearch}
            />

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Filtrar por tag
              </span>

              <select
                value={selectedTag}
                onChange={(event) => setSelectedTag(event.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="">Todos</option>

                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
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
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Recomendaciones para RM 100 kg
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            {recommendations.map((recommendation) => (
              <WeightRecommendationCard
                key={recommendation.label}
                recommendation={recommendation}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
