import { useState } from "react";
import { useGymLog } from "../context/GymLogContext";
import Button from "./Button";
import Input from "./Input";
import { predefinedExerciseTags } from "../data/exerciseTags";

function ExerciseForm() {
  const { addExercise } = useGymLog();

  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function toggleTag(tag: string) {
  if (selectedTags.includes(tag)) {
    setSelectedTags((currentTags) =>
      currentTags.filter((currentTag) => currentTag !== tag)
    );
    return;
  }

  if (selectedTags.length >= 3) {
    setError("Solo puedes seleccionar entre 1 y 3 tags.");
    return;
  }

  setSelectedTags((currentTags) => [...currentTags, tag]);
}

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

    if (selectedTags.length === 0) {
    setError("Debes seleccionar al menos un tag.");
    return;
    }

    await addExercise({
      name: name.trim(),
      muscleGroup: muscleGroup.trim(),
      tags: selectedTags,
    });

    setName("");
    setMuscleGroup("");
    setSelectedTags([]);
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
      </div>

      <div className="mt-4">
  <p className="text-sm font-medium text-gray-700">
    Tags del ejercicio, selecciona entre 1 y 3
  </p>

  <div className="mt-2 flex flex-wrap gap-2">
    {predefinedExerciseTags.map((tag) => {
      const isSelected = selectedTags.includes(tag);

      return (
        <button
          key={tag}
          type="button"
          onClick={() => toggleTag(tag)}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isSelected
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {tag}
        </button>
      );
    })}
  </div>
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
