# Capa de red del frontend

## Introducción

En GymLog se ha creado una capa de red en el frontend para comunicar React con la API REST del backend.

Esta capa evita hacer llamadas `fetch` directamente desde los componentes y centraliza la comunicación con el servidor.

## Archivo principal

El cliente de API está en:

```txt
client/src/api/client.ts
URL base

La URL base de la API durante el desarrollo es:

http://localhost:3000/api/v1

En el código se define así:

const API_BASE_URL = "http://localhost:3000/api/v1";
Función genérica request

Se ha creado una función genérica llamada request.

async function request<T>(url: string, options?: RequestInit): Promise<T>

Esta función:

ejecuta la petición con fetch
añade la cabecera Content-Type: application/json
comprueba si la respuesta es correcta
lanza errores si la API devuelve un código incorrecto
devuelve datos tipados usando TypeScript
Tipado de respuestas

Las funciones del cliente devuelven datos tipados.

Ejemplo:

export function getExercises() {
  return request<Exercise[]>("/exercises");
}

Esto indica que la API devolverá un array de Exercise.

Funciones creadas
Ejercicios
getExercises()
createExercise(exercise)
updateExercise(id, exercise)
deleteExercise(id)
Sesiones
getSessions()
createSession(session)
RM
getRms()
createOrUpdateRm(rm)
Tipos alineados con backend

Los tipos utilizados están definidos en:

client/src/types/gym.ts

Los principales son:

Exercise
TrainingSession
ExerciseRM
WeightRecommendation

Estos tipos coinciden con la estructura de datos que devuelve el backend Express.

Estados de red

La interfaz gestiona tres estados principales:

Loading

Cuando se cargan datos desde la API se activa isLoading.

setIsLoading(true);

Esto permite mostrar un componente de carga.

Success

Cuando la API responde correctamente, los datos se guardan en el estado.

const data = await getExercises();
setExercises(data);
Error

Si la API falla, se guarda un mensaje de error.

setError("No se pudieron cargar los ejercicios.");

Este mensaje se muestra al usuario con el componente ErrorMessage.

Uso en Context API

El contexto global consume el cliente de API.

Archivo:

client/src/context/GymLogContext.tsx

El contexto llama a:

getExercises()
createExercise()

De esta forma, los componentes no necesitan conocer los detalles de fetch.

Fuente de verdad

A partir de este punto, los ejercicios dejan de cargarse desde mockExercises y pasan a obtenerse desde la API.

La API se convierte en la fuente principal de datos para los ejercicios.

Limitación actual

Actualmente el backend guarda los datos en memoria. Esto significa que los datos creados desaparecen si el servidor se reinicia.

En una versión futura se podría añadir una base de datos real como Supabase, MongoDB o Firebase.

Conclusión

La capa de red permite separar la lógica de comunicación con la API del resto de la aplicación.

Esto mejora la organización, facilita el mantenimiento y permite trabajar con datos tipados entre frontend y backend.

## Conexión de sesiones con la API

También se han conectado las sesiones de entrenamiento con el backend.

El frontend utiliza:

```ts
getSessions()
createSession(session)

Estas funciones llaman a los endpoints:

GET /api/v1/sessions
POST /api/v1/sessions

Gracias a esto, las sesiones creadas desde la página Nueva sesión se guardan en la API y después se pueden consultar desde Historial y Dashboard.