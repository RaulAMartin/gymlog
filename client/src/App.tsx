import ExerciseList from "./components/ExerciseList";
import WeightRecommendationCard from "./components/WeightRecommendationCard";
import { calculateWeightRecommendations } from "./utils/calculateWeights";
import type { Exercise } from "./types/gym";

const exercises: Exercise[] = [
  {
    id: "1",
    name: "Press banca",
    muscleGroup: "Pecho",
    tags: ["tren superior", "push", "pecho"],
  },
  {
    id: "2",
    name: "Sentadilla",
    muscleGroup: "Pierna",
    tags: ["tren inferior", "pierna", "fuerza"],
  },
  {
    id: "3",
    name: "Peso muerto",
    muscleGroup: "Espalda",
    tags: ["pull", "espalda", "fuerza"],
  },
];

const recommendations = calculateWeightRecommendations(100);

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">GymLog</h1>
          <p className="mt-2 text-gray-600">
            Registro de entrenamientos, ejercicios y marcas personales.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Biblioteca de ejercicios
          </h2>

          <ExerciseList exercises={exercises} />
        </section>

        <section>
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
