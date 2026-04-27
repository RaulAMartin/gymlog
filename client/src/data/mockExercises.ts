import type { Exercise } from "../types/gym";

export const mockExercises: Exercise[] = [
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
  {
    id: "4",
    name: "Press militar",
    muscleGroup: "Hombro",
    tags: ["tren superior", "push", "hombro"],
  },
  {
    id: "5",
    name: "Dominadas",
    muscleGroup: "Espalda",
    tags: ["tren superior", "pull", "espalda"],
  },
];
