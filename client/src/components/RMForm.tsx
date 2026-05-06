import { useMemo, useState } from "react";
import { useGymLog } from "../context/GymLogContext";
import { calculateWeightRecommendations } from "../utils/calculateWeights";
import Button from "./Button";
import Input from "./Input";
import WeightRecommendationCard from "./WeightRecommendationCard";

function RMForm() {
  const { exercises, addOrUpdateRm } = useGymLog();

  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [rm, setRm] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [savedRm, setSavedRm] = useState<number | null>(null);

  const selectedExercise = exercises.find(
    (exercise) => exercise.id === selectedExerciseId
  );

  const recommendations = useMemo(() => {
    if (!savedRm) {
      return [];
    }

    return calculateWeightRecommendations(savedRm);
  }, [savedRm]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");
    setSavedRm(null);

    if (!selectedExerciseId) {
      setError("Debes seleccionar un ejercicio.");
      return;
    }

    if (!rm.trim()) {
      setError("Debes introducir un RM.");
      return;
    }

    const numericRm = Number(rm);

    if (Number.isNaN(numericRm)) {
      setError("El RM debe ser un número válido.");
      return;
    }

    if (numericRm <= 0) {
      setError("El RM debe ser mayor que 0.");
      return;
    }

    if (!selectedExercise) {
    setError("El ejercicio seleccionado no existe.");
    return;
    }

    await addOrUpdateRm({
    exerciseId: selectedExercise.id,
    exerciseName: selectedExercise.name,
    rm: numericRm,
  });

    setSavedRm(numericRm);
    setSuccessMessage(
      `RM registrado para ${selectedExercise?.name}: ${numericRm} kg.`
    );
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">Registrar RM</h2>

      <p className="mt-2 text-gray-600">
        Selecciona un ejercicio e introduce tu repetición máxima.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Ejercicio</span>

          <select
            value={selectedExerciseId}
            onChange={(event) => setSelectedExerciseId(event.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="">Selecciona un ejercicio</option>

            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="RM en kg"
          value={rm}
          type="number"
          placeholder="Ej: 100"
          onChange={setRm}
        />

        <div className="flex items-end">
          <Button type="submit">Calcular pesos</Button>
        </div>
      </form>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}

      {successMessage && (
        <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          {successMessage}
        </p>
      )}

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Pesos recomendados
          </h3>

          <div className="grid gap-4 md:grid-cols-4">
            {recommendations.map((recommendation) => (
              <WeightRecommendationCard
                key={recommendation.label}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default RMForm;
