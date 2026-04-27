# Hooks de React

## Introducción

En GymLog se utilizan hooks de React para gestionar el estado de la aplicación, cargar datos, optimizar cálculos y reutilizar lógica.

Los hooks permiten organizar mejor el código y separar la lógica de los componentes visuales.

## useState

`useState` se utiliza para gestionar datos que pueden cambiar durante la ejecución de la aplicación.

En el custom hook `useExercises` se utiliza para guardar:

- lista de ejercicios
- texto de búsqueda
- tag seleccionado
- estado de carga
- mensaje de error

Ejemplo:

```ts
const [search, setSearch] = useState("");
