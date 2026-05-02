import { useState } from "react";
import { useGymLog } from "../context/GymLogContext";
import Button from "./Button";
import Input from "./Input";

function ExerciseForm() {
  const { addExercise } = useGymLog();

  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!name.trim()) {
      setError("El nombre del ejercicio es obligatorio.");
      return;
    }

    if (!muscleGroup.trim()) {
      setError("El grupo muscular es obligatorio.");
      return;
    }

    if (!tags.trim()) {
      setError("Debes añadir al menos un tag.");
      return;
    }

    const formattedTags = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    await addExercise({
      name: name.trim(),
      muscleGroup: muscleGroup.trim(),
      tags: formattedTags,
    });

    setName("");
    setMuscleGroup("");
    setTags("");
    setSuccessMessage("Ejercicio añadido correctamente.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4"
    >
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Añadir ejercicio
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Input
          label="Nombre"
          value={name}
          placeholder="Ej: Press banca"
          onChange={setName}
        />

        <Input
          label="Grupo muscular"
          value={muscleGroup}
          placeholder="Ej: Pecho"
          onChange={setMuscleGroup}
        />

        <Input
          label="Tags separados por coma"
          value={tags}
          placeholder="Ej: tren superior, push, pecho"
          onChange={setTags}
        />
      </div>

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
        <Button type="submit">Guardar ejercicio</Button>
      </div>
    </form>
  );
}

export default ExerciseForm;
