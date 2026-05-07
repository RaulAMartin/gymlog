import { useState } from "react";
import { useGymLog } from "../context/GymLogContext";
import type { TrainingSession } from "../types/gym";
import Button from "./Button";
import Input from "./Input";

type SessionEditFormProps = {
  session: TrainingSession;
  onCancel: () => void;
  onSaved: () => void;
};

function SessionEditForm({ session, onCancel, onSaved }: SessionEditFormProps) {
  const { exercises, editSession } = useGymLog();

  const firstExercise = session.exercises[0];
  const firstSet = firstExercise?.sets[0];

  const [date, setDate] = useState(session.date);
  const [notes, setNotes] = useState(session.notes ?? "");
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    firstExercise?.exerciseId ?? ""
  );
  const [series, setSeries] = useState(
    firstExercise?.sets.length ? String(firstExercise.sets.length) : "1"
  );
  const [reps, setReps] = useState(firstSet ? String(firstSet.reps) : "");
  const [weight, setWeight] = useState(firstSet ? String(firstSet.weight) : "");
  const [error, setError] = useState("");

  const selectedExercise = exercises.find(
    (exercise) => exercise.id === selectedExerciseId
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!date) {
      setError("Debes seleccionar una fecha.");
      return;
    }

    if (!selectedExerciseId || !selectedExercise) {
      setError("Debes seleccionar un ejercicio.");
      return;
    }

    const numericSeries = Number(series);
    const numericReps = Number(reps);
    const numericWeight = Number(weight);

    if (Number.isNaN(numericSeries) || numericSeries <= 0) {
      setError("El número de series debe ser mayor que 0.");
      return;
    }

    if (Number.isNaN(numericReps) || numericReps <= 0) {
      setError("Las repeticiones deben ser mayores que 0.");
      return;
    }

    if (Number.isNaN(numericWeight) || numericWeight <= 0) {
      setError("El peso debe ser mayor que 0.");
      return;
    }

    await editSession(session.id, {
      date,
      notes,
      exercises: [
        {
          exerciseId: selectedExercise.id,
          exerciseName: selectedExercise.name,
          sets: Array.from({ length: numericSeries }, () => ({
            reps: numericReps,
            weight: numericWeight,
          })),
        },
      ],
    });

    onSaved();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4"
    >
      <h3 className="text-lg font-bold text-gray-900">Editar sesión</h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input label="Fecha" type="date" value={date} onChange={setDate} />

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Ejercicio</span>

          <select
            value={selectedExerciseId}
            onChange={(event) => setSelectedExerciseId(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
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
          label="Número de series"
          type="number"
          value={series}
          onChange={setSeries}
        />

        <Input
          label="Repeticiones"
          type="number"
          value={reps}
          onChange={setReps}
        />

        <Input
          label="Peso en kg"
          type="number"
          value={weight}
          onChange={setWeight}
        />
      </div>

      <label className="mt-4 flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Notas</span>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="min-h-24 rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
        />
      </label>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="submit">Guardar cambios</Button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-900 hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default SessionEditForm;
