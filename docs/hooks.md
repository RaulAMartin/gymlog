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

## Segundo custom hook: useSessions

Además de `useExercises`, se ha creado un segundo custom hook llamado `useSessions`.

Archivo:

```txt
client/src/hooks/useSessions.ts

Este hook se encarga de calcular datos derivados de las sesiones de entrenamiento.

Devuelve:

sesiones registradas
número total de sesiones
número total de ejercicios realizados
número total de series registradas
última sesión registrada

Este hook utiliza useMemo para optimizar los cálculos y evitar recalcular estadísticas innecesariamente en cada render.

Gracias a este hook, el Dashboard y el Historial pueden acceder a información de sesiones de forma más ordenada.


---

# 14. Actualizar `docs/components.md`

Al final añade:

```md
## SessionForm

Archivo:

```txt
client/src/components/SessionForm.tsx

Este componente permite registrar una nueva sesión de entrenamiento.

Campos:

fecha
ejercicio
repeticiones
peso
notas

El formulario valida que la fecha, el ejercicio, las repeticiones y el peso sean correctos.

SessionCard

Archivo:

client/src/components/SessionCard.tsx

Este componente muestra una sesión registrada en el historial.

Incluye:

fecha
notas
ejercicios realizados
series, repeticiones y peso
