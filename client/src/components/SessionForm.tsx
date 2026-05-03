import { useState } from "react";
import { useGymLog } from "../context/GymLogContext";
import Button from "./Button";
import Input from "./Input";

function SessionForm() {
  const { exercises, addSession } = useGymLog();

  const [date, setDate] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedExercise = exercises.find(
    (exercise) => exercise.id === selectedExerciseId
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!date) {
      setError("Debes seleccionar una fecha.");
      return;
    }

    if (!selectedExerciseId || !selectedExercise) {
      setError("Debes seleccionar un ejercicio.");
      return;
    }

    const numericReps = Number(reps);
    const numericWeight = Number(weight);

    if (!reps || Number.isNaN(numericReps) || numericReps <= 0) {
      setError("Las repeticiones deben ser un número mayor que 0.");
      return;
    }

    if (!weight || Number.isNaN(numericWeight) || numericWeight <= 0) {
      setError("El peso debe ser un número mayor que 0.");
      return;
    }

    await addSession({
  date,
  notes,
  exercises: [
    {
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      sets: [
        {
          reps: numericReps,
          weight: numericWeight,
        },
      ],
    },
  ],
});

    setDate("");
    setSelectedExerciseId("");
    setReps("");
    setWeight("");
    setNotes("");
    setSuccessMessage("Sesión guardada correctamente.");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Registrar nueva sesión
      </h2>

      <p className="mt-2 text-gray-600">
        Añade un ejercicio, repeticiones, peso y notas de entrenamiento.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input
          label="Fecha"
          type="date"
          value={date}
          onChange={setDate}
        />

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
          label="Repeticiones"
          type="number"
          value={reps}
          placeholder="Ej: 8"
          onChange={setReps}
        />

        <Input
          label="Peso en kg"
          type="number"
          value={weight}
          placeholder="Ej: 60"
          onChange={setWeight}
        />
      </div>

      <label className="mt-4 flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Notas</span>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Ej: Buen entrenamiento de pecho"
          className="min-h-24 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </label>

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

      <div className="mt-4">
        <Button type="submit">Guardar sesión</Button>
      </div>
    </form>
  );
}

export default SessionForm;
