# Formularios e interacción

## Introducción

En GymLog se han creado formularios controlados usando React y TypeScript.

Un formulario controlado es aquel en el que los valores de los inputs se guardan en el estado del componente. Esto permite validar los datos, mostrar errores y controlar qué ocurre al enviar el formulario.

## Formularios creados

Se han creado dos formularios principales:

- `ExerciseForm`
- `RMForm`

## ExerciseForm

Archivo:

```txt
client/src/components/ExerciseForm.tsx

Este formulario permite añadir un nuevo ejercicio a la biblioteca.

Campos
Nombre del ejercicio
Grupo muscular
Tags separados por coma
Estado utilizado
const [name, setName] = useState("");
const [muscleGroup, setMuscleGroup] = useState("");
const [tags, setTags] = useState("");
const [error, setError] = useState("");
const [successMessage, setSuccessMessage] = useState("");

Cada input está vinculado a un estado mediante value y onChange.

Validaciones

El formulario valida que:

el nombre no esté vacío
el grupo muscular no esté vacío
exista al menos un tag

Si algún campo no es correcto, se muestra un mensaje de error.

Envío del formulario

Al enviar el formulario se ejecuta handleSubmit.

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

Se usa event.preventDefault() para evitar que la página se recargue.

Conversión de tags

Los tags introducidos por el usuario se separan usando comas.

Ejemplo:

tren superior, push, pecho

Se convierte en:

["tren superior", "push", "pecho"]
RMForm

Archivo:

client/src/components/RMForm.tsx

Este formulario permite registrar el RM de un ejercicio y calcular pesos recomendados.

Campos
Ejercicio
RM en kg
Estado utilizado
const [selectedExerciseId, setSelectedExerciseId] = useState("");
const [rm, setRm] = useState("");
const [error, setError] = useState("");
const [successMessage, setSuccessMessage] = useState("");
const [savedRm, setSavedRm] = useState<number | null>(null);
Validaciones

El formulario valida que:

se seleccione un ejercicio
el RM no esté vacío
el RM sea un número válido
el RM sea mayor que 0
Cálculo de pesos

Cuando el RM es correcto, se calculan recomendaciones de peso:

RM 100%
Fuerza 80%
Bodybuilding 60%
Cardio 40%

La función utilizada está en:

client/src/utils/calculateWeights.ts
Mensajes de error

Los mensajes de error se muestran cuando el usuario introduce datos incorrectos.

Ejemplos:

El nombre del ejercicio es obligatorio.
Debes seleccionar un ejercicio.
El RM debe ser mayor que 0.
Mensajes de confirmación

Los mensajes de confirmación se muestran cuando una acción se realiza correctamente.

Ejemplos:

Ejercicio añadido correctamente.
RM registrado para Press banca: 100 kg.
Interacción con Context API

El formulario ExerciseForm usa el contexto global para añadir ejercicios.

const { addExercise } = useGymLog();

De esta manera, cuando se crea un ejercicio, la lista global de ejercicios se actualiza automáticamente.

Conclusión

En este punto se han creado formularios controlados con validaciones básicas, mensajes de error y confirmación.

Esto permite que GymLog tenga interacción real con el usuario y prepara la aplicación para conectar estos formularios con una API en puntos posteriores.


---

# 10. Probar que todo funciona

Haz estas pruebas:

## Página ejercicios

```txt
http://localhost:5173/exercises

Comprueba:

Añadir ejercicio válido
Intentar añadir ejercicio sin nombre
Intentar añadir ejercicio sin grupo muscular
Intentar añadir ejercicio sin tags
Buscar el nuevo ejercicio
Filtrar por un tag nuevo
Página RM
http://localhost:5173/rm

Comprueba:

Registrar RM válido
Intentar enviar sin ejercicio
Intentar enviar sin RM
Intentar enviar RM negativo
Ver recomendaciones de peso
