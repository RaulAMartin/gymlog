# API REST de GymLog

## Introducción

GymLog incluye un backend desarrollado con Node.js y Express.

La API permite gestionar:

- ejercicios
- sesiones de entrenamiento
- marcas RM

La ruta base de la API es:

```txt
http://localhost:3000/api/v1
Arquitectura del backend

El backend utiliza una arquitectura por capas:

server/
├── routes/
├── controllers/
├── services/
├── data/
└── index.js
Capas
Routes

Definen las rutas HTTP disponibles.

Ejemplo:

GET /api/v1/exercises
POST /api/v1/exercises
Controllers

Reciben la petición, validan los datos básicos y devuelven una respuesta HTTP.

Services

Contienen la lógica de negocio.

Data

Contiene datos simulados en memoria.

En una versión futura, esta capa podría sustituirse por una base de datos como Supabase, MongoDB o Firebase.

Códigos HTTP utilizados
Código	Significado
200	Operación correcta
201	Recurso creado correctamente
400	Datos incorrectos enviados por el cliente
404	Recurso no encontrado
500	Error interno del servidor
Endpoints de ejercicios
Obtener todos los ejercicios
GET /api/v1/exercises

Respuesta:

[
  {
    "id": "1",
    "name": "Press banca",
    "muscleGroup": "Pecho",
    "tags": ["tren superior", "push", "pecho"]
  }
]
Obtener un ejercicio por ID
GET /api/v1/exercises/:id

Ejemplo:

GET /api/v1/exercises/1
Crear ejercicio
POST /api/v1/exercises

Body:

{
  "name": "Press militar",
  "muscleGroup": "Hombro",
  "tags": ["tren superior", "push", "hombro"]
}

Respuesta:

{
  "id": "uuid-generado",
  "name": "Press militar",
  "muscleGroup": "Hombro",
  "tags": ["tren superior", "push", "hombro"]
}
Actualizar ejercicio
PUT /api/v1/exercises/:id

Body:

{
  "name": "Press banca plano",
  "muscleGroup": "Pecho",
  "tags": ["tren superior", "push", "pecho", "fuerza"]
}
Eliminar ejercicio
DELETE /api/v1/exercises/:id

Respuesta:

{
  "message": "Ejercicio eliminado correctamente."
}
Endpoints de sesiones
Obtener sesiones
GET /api/v1/sessions

Respuesta:

[
  {
    "id": "1",
    "date": "2026-04-27",
    "notes": "Buen entrenamiento de pecho",
    "exercises": [
      {
        "exerciseId": "1",
        "exerciseName": "Press banca",
        "sets": [
          {
            "reps": 8,
            "weight": 60
          }
        ]
      }
    ]
  }
]
Obtener sesión por ID
GET /api/v1/sessions/:id
Crear sesión
POST /api/v1/sessions

Body:

{
  "date": "2026-05-02",
  "notes": "Entrenamiento de pierna",
  "exercises": [
    {
      "exerciseId": "2",
      "exerciseName": "Sentadilla",
      "sets": [
        {
          "reps": 8,
          "weight": 80
        }
      ]
    }
  ]
}
Actualizar sesión
PUT /api/v1/sessions/:id
Eliminar sesión
DELETE /api/v1/sessions/:id

Respuesta:

{
  "message": "Sesión eliminada correctamente."
}
Endpoints de RM
Obtener marcas RM
GET /api/v1/rms

Respuesta:

[
  {
    "id": "1",
    "exerciseId": "1",
    "exerciseName": "Press banca",
    "rm": 100,
    "updatedAt": "2026-04-27"
  }
]
Obtener RM por ID
GET /api/v1/rms/:id
Crear o actualizar RM
POST /api/v1/rms

Body:

{
  "exerciseId": "1",
  "exerciseName": "Press banca",
  "rm": 105
}

Respuesta:

{
  "id": "1",
  "exerciseId": "1",
  "exerciseName": "Press banca",
  "rm": 105,
  "updatedAt": "2026-05-02"
}
Eliminar RM
DELETE /api/v1/rms/:id

Respuesta:

{
  "message": "RM eliminado correctamente."
}
Validaciones

La API valida datos básicos antes de crear recursos.

Ejemplos:

un ejercicio necesita name, muscleGroup y tags
una sesión necesita date y exercises
un RM necesita exerciseId, exerciseName y un rm mayor que 0

Si los datos no son correctos, la API devuelve:

400 Bad Request
Persistencia actual

Actualmente los datos se guardan en memoria usando arrays dentro de la carpeta data.

Esto significa que si el servidor se reinicia, los datos nuevos se pierden.

En una versión futura se podría conectar con una base de datos real como:

Supabase
MongoDB
Firebase
Conclusión

En este punto se ha creado una API REST con Express, aplicando una arquitectura por capas y usando códigos HTTP correctos.
