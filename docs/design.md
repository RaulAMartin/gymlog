# Diseño y arquitectura de la aplicación

## Nombre del proyecto

GymLog

## Descripción técnica general

GymLog será una aplicación web fullstack para registrar entrenamientos de gimnasio, gestionar una biblioteca de ejercicios y calcular recomendaciones de peso en función del RM del usuario.

La aplicación estará dividida en dos partes principales:

- **Frontend**: desarrollado con React, TypeScript, Vite y Tailwind CSS.
- **Backend/API**: desarrollado con Node.js y Express.

El frontend se encargará de mostrar la interfaz, gestionar formularios, rutas, estados de carga y llamadas a la API.

El backend se encargará de exponer endpoints REST para gestionar ejercicios, sesiones de entrenamiento y marcas RM.

## Estructura general del proyecto

La estructura principal del proyecto será:

```txt
gym-tracker-app/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── data/
│   └── index.js
│
├── docs/
│   ├── agile.md
│   ├── idea.md
│   ├── project-management.md
│   └── design.md
│
└── README.md

Páginas principales del frontend

La aplicación tendrá varias páginas principales:

Dashboard

Página inicial con resumen general del usuario.

Mostrará:

número total de sesiones
últimos entrenamientos
ejercicios destacados
resumen de marcas RM
Ejercicios

Página para consultar la biblioteca de ejercicios.

Permitirá:

ver ejercicios disponibles
buscar por nombre
filtrar por tags
añadir nuevos ejercicios
Nueva sesión

Página para registrar una nueva sesión de entrenamiento.

Permitirá:

seleccionar ejercicios
añadir series
indicar repeticiones
indicar peso usado
guardar notas
Historial

Página para consultar entrenamientos anteriores.

Permitirá:

ver sesiones anteriores
acceder al detalle de cada sesión
eliminar sesiones
editar sesiones en una versión futura
Marcas/RM

Página para registrar y consultar el RM de cada ejercicio.

Permitirá:

guardar el RM de un ejercicio
actualizar el RM
calcular pesos recomendados según objetivo
Página 404

Página que se mostrará cuando el usuario entre en una ruta no existente.

Componentes principales

Los componentes principales serán:

Navbar: menú de navegación de la aplicación.
Layout: estructura general de la aplicación.
ExerciseCard: tarjeta para mostrar un ejercicio.
ExerciseForm: formulario para crear ejercicios.
ExerciseList: listado de ejercicios.
SessionCard: tarjeta resumen de una sesión.
SessionForm: formulario para crear una sesión.
RMForm: formulario para registrar RM.
WeightRecommendationCard: tarjeta con pesos recomendados.
LoadingSpinner: componente para estados de carga.
ErrorMessage: componente para mostrar errores.
Button: botón reutilizable.
Input: input reutilizable.
Componentes reutilizables

Los componentes reutilizables serán aquellos que se puedan usar en varias partes de la aplicación.

Ejemplos:

Button
Input
Navbar
Layout
LoadingSpinner
ErrorMessage
ExerciseCard
SessionCard

Estos componentes recibirán props tipadas con TypeScript.

Gestión del estado

La aplicación usará varios tipos de estado.

Estado local

Se usará useState para formularios y datos temporales de componentes.

Ejemplos:

nombre de un ejercicio
peso introducido
repeticiones
errores de validación
campos de búsqueda
Efectos secundarios

Se usará useEffect para cargar datos desde la API cuando se cargue una página o componente.

Ejemplo:

cargar lista de ejercicios al entrar en la página de ejercicios
cargar historial de sesiones al entrar en la página de historial
Cálculos optimizados

Se usará useMemo para cálculos derivados que no deben recalcularse en cada render.

Ejemplos:

filtrar ejercicios por tags
calcular estadísticas básicas
calcular pesos recomendados según RM
Funciones memorizadas

Se usará useCallback para funciones que se pasen como props a componentes hijos o que puedan provocar renders innecesarios.

Ejemplos:

función para eliminar una sesión
función para seleccionar un ejercicio
función para aplicar filtros
Estado global

Se usará Context API para compartir información entre páginas y componentes.

Posibles contextos:

ExerciseContext: ejercicios disponibles.
SessionContext: sesiones de entrenamiento.
RMContext: marcas RM del usuario.

En una primera versión se puede crear un contexto principal llamado GymLogContext.

Backend/API

El backend estará desarrollado con Node.js y Express.

Se aplicará una arquitectura por capas:

server/
├── routes/
├── controllers/
├── services/
├── data/
└── index.js

Routes

Definen las rutas de la API.

Ejemplo:

GET /api/v1/exercises
POST /api/v1/exercises

Controllers

Reciben la petición HTTP, validan datos básicos y devuelven respuestas.

Services

Contienen la lógica de negocio.

Ejemplo:

crear ejercicio
filtrar sesiones
calcular recomendaciones
buscar RM de un ejercicio
Data

En una primera versión, puede contener datos simulados en memoria.

Más adelante podría sustituirse por una base de datos como Supabase, MongoDB o Firebase.

Recursos REST de la API

La API usará la ruta base:

/api/v1

Endpoints de ejercicios:

Obtener ejercicios:

GET /api/v1/exercises

Respuesta esperada:

[
  {
    "id": "1",
    "name": "Press banca",
    "muscleGroup": "Pecho",
    "tags": ["tren superior", "push", "pecho"]
  }
]

Crear ejercicio

POST /api/v1/exercises

Body esperado:

{
  "name": "Press banca",
  "muscleGroup": "Pecho",
  "tags": ["tren superior", "push", "pecho"]
}

Respuesta esperada:

{
  "id": "1",
  "name": "Press banca",
  "muscleGroup": "Pecho",
  "tags": ["tren superior", "push", "pecho"]
}
Endpoints de sesiones
Obtener sesiones
GET /api/v1/sessions

Respuesta esperada:

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
Crear sesión
POST /api/v1/sessions

Body esperado:

{
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
Obtener una sesión concreta
GET /api/v1/sessions/:id
Editar una sesión
PUT /api/v1/sessions/:id
Eliminar una sesión
DELETE /api/v1/sessions/:id
Endpoints de RM
Obtener marcas RM
GET /api/v1/rms

Respuesta esperada:

[
  {
    "id": "1",
    "exerciseId": "1",
    "exerciseName": "Press banca",
    "rm": 100,
    "updatedAt": "2026-04-27"
  }
]
Crear o actualizar RM
POST /api/v1/rms

Body esperado:

{
  "exerciseId": "1",
  "exerciseName": "Press banca",
  "rm": 100
}
Contratos de datos TypeScript

Los tipos principales serán:

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  tags: string[];
};

export type TrainingSet = {
  reps: number;
  weight: number;
};

export type SessionExercise = {
  exerciseId: string;
  exerciseName: string;
  sets: TrainingSet[];
};

export type TrainingSession = {
  id: string;
  date: string;
  notes?: string;
  exercises: SessionExercise[];
};

export type ExerciseRM = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  rm: number;
  updatedAt: string;
};

export type WeightRecommendation = {
  label: string;
  percentage: number;
  weight: number;
};
Persistencia de datos

En la primera versión del proyecto, los datos principales vivirán en el backend.

Datos gestionados por la API:

ejercicios
sesiones de entrenamiento
marcas RM

Datos que pueden quedarse solo en el cliente:

filtros seleccionados
texto de búsqueda
estado de formularios
mensajes temporales de error o éxito

En una versión futura, el backend podría conectarse a una base de datos real como Supabase, MongoDB o Firebase.

Cálculo de pesos recomendados

La aplicación calculará pesos recomendados a partir del RM del usuario.

Ejemplo:

Si el RM de press banca es 100 kg:

RM 100%: 100 kg
Fuerza 80%: 80 kg
Bodybuilding 60%: 60 kg
Cardio 40%: 40 kg

La fórmula será:

peso recomendado = RM * porcentaje
Flujo de datos

El flujo principal de datos será:

Usuario
  ↓
Interfaz React
  ↓
Cliente API tipado
  ↓
Backend Express
  ↓
Servicios
  ↓
Datos en memoria o base de datos
  ↓
Respuesta JSON
  ↓
Frontend actualiza la interfaz

Diagrama simple:
┌──────────────┐
│   Usuario    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ React + TS   │
│ Frontend     │
└──────┬───────┘
       │ fetch
       ▼
┌──────────────┐
│ Cliente API  │
│ tipado       │
└──────┬───────┘
       │ HTTP
       ▼
┌──────────────┐
│ Express API  │
│ Backend      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Services     │
│ Lógica       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Data / DB    │
│ Datos        │
└──────────────┘
Decisiones técnicas
Se usará React con TypeScript para tener componentes tipados.
Se usará Tailwind CSS para crear una interfaz rápida y responsive.
Se usará React Router para separar la aplicación en páginas.
Se usará Express para crear una API REST.
Se usará una estructura por capas en backend: rutas, controladores y servicios.
Se usará un cliente de API tipado en frontend para evitar llamadas fetch desordenadas.
Los datos principales estarán gestionados por la API.
El sistema de amigos y comparación de marcas se dejará como mejora futura.
Mejoras futuras

En futuras versiones se podrían añadir:

autenticación de usuarios
base de datos real
sistema de amigos
comparación de marcas
rankings privados
rutinas compartidas
gráficos avanzados de progreso
integración con APIs externas de ejercicios