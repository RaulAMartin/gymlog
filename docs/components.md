# Componentes de la aplicación

## Introducción

En GymLog se han creado componentes reutilizables usando React, TypeScript y Tailwind CSS.

El objetivo de estos componentes es evitar repetir código, mantener una estructura clara y facilitar el mantenimiento de la aplicación.

## Button

Archivo:

```txt
client/src/components/Button.tsx

El componente Button representa un botón reutilizable para la aplicación.

Props
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};
Uso

Se puede usar en formularios, acciones de guardar, eliminar o navegar.

Input

Archivo:

client/src/components/Input.tsx

El componente Input representa un campo de formulario reutilizable.

Props
type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
};
Uso

Se usará para introducir datos como nombre de ejercicio, grupo muscular, peso, repeticiones o notas.

ExerciseCard

Archivo:

client/src/components/ExerciseCard.tsx

El componente ExerciseCard muestra la información de un ejercicio.

Muestra:

nombre del ejercicio
grupo muscular
tags asociados
Props
type ExerciseCardProps = {
  exercise: Exercise;
};
ExerciseList

Archivo:

client/src/components/ExerciseList.tsx

El componente ExerciseList recibe un array de ejercicios y renderiza una lista de ExerciseCard.

Si no hay ejercicios, muestra un mensaje informativo.

Props
type ExerciseListProps = {
  exercises: Exercise[];
};

WeightRecommendationCard

Archivo:

client/src/components/WeightRecommendationCard.tsx

El componente WeightRecommendationCard muestra una recomendación de peso basada en el RM del usuario.

Muestra:

tipo de entrenamiento
porcentaje del RM
peso recomendado
Props
type WeightRecommendationCardProps = {
  recommendation: WeightRecommendation;
};