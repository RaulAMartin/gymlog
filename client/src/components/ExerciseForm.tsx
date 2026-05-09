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

  function handleTagsChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(
      event.target.selectedOptions
    ).map((option) => option.value);

    if (selectedOptions.length > 3) {
      setError("Solo puedes seleccionar entre 1 y 3 tags.");
      return;
    }

    setError("");
    setSelectedTags(selectedOptions);
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
      className="
        mb-6
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        p-4
        dark:border-gray-700
        dark:bg-gray-900
      "
    >
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
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

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags (1 a 3)
          </span>

          <select
            multiple
            value={selectedTags}
            onChange={handleTagsChange}
            className="
              h-36
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              py-2
              text-gray-900
              outline-none
              focus:border-blue-500
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-100
            "
          >
            {predefinedExerciseTags.map((tag) => (
              <option
                key={tag}
                value={tag}
                className="dark:bg-gray-800 dark:text-gray-100"
              >
                {tag}
              </option>
            ))}
          </select>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            Ctrl + click para seleccionar varios
          </span>
        </label>
      </div>

      {error && (
        <p
          className="
            mt-4
            rounded-lg
            bg-red-50
            p-3
            text-sm
            text-red-800
            dark:bg-red-900/30
            dark:text-red-300
          "
        >
          {error}
        </p>
      )}

      {successMessage && (
        <p
          className="
            mt-4
            rounded-lg
            bg-green-50
            p-3
            text-sm
            text-green-800
            dark:bg-green-900/30
            dark:text-green-300
          "
        >
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
