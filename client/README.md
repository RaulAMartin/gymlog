GymLog

Aplicación web fullstack para registrar entrenamientos de gimnasio, gestionar ejercicios personalizados, historial de sesiones y marcas RM.

Descripción del proyecto:

GymLog es una aplicación desarrollada como proyecto final de Desarrollo de Aplicaciones Multiplataforma (DAM).

El objetivo principal del proyecto ha sido crear una plataforma moderna y escalable donde cada usuario pueda:

Registrar entrenamientos
Gestionar ejercicios personalizados
Registrar marcas RM
Consultar historial de sesiones
Utilizar una base de datos sincronizada en la nube
Mantener sesiones persistentes mediante autenticación

Tecnologías utilizadas:

Frontend
React
TypeScript
TailwindCSS
React Router
Framer Motion

Backend/API REST:

Node.js
Express

Base de datos y autenticación:

Supabase
PostgreSQL
Supabase Auth

Deploy:

Frontend: Vercel
Backend/API: Render

URLs del proyecto:

Frontend (Vercel):

https://gymlog-sage.vercel.app/

Backend/API (Render):

https://gymlog-api-5yup.onrender.com/

Funcionalidades principales:

Sistema de usuarios:

Registro de usuarios
Inicio de sesión
Persistencia de sesión
Logout
Protección de rutas privadas

Gestión de ejercicios:

Crear ejercicios personalizados
Eliminar ejercicios
Filtrar por tags
Búsqueda dinámica
Importar ejercicios base
Ejercicios con imágenes
Asociación de RM por ejercicio

Sistema RM:

El usuario puede registrar una marca RM personalizada por ejercicio.

La aplicación calcula automáticamente:

RM 100%
Fuerza 80%
Bodybuilding 60%
Cardio 40%

También se permite registrar ejercicios sin peso (RM = 0).

Sesiones de entrenamiento:

Crear sesiones
Historial persistente
Editar sesiones
Repetir sesiones
Asociación de ejercicios y series
Persistencia en Supabase

Interfaz y experiencia de usuario:

Diseño responsive
Modo oscuro
Animaciones
Transiciones suaves
Componentización modular
Diseño moderno y escalable

Arquitectura del proyecto:

El proyecto sigue una estructura modular:

client/
 ├── src/
 │    ├── api/
 │    ├── assets/
 │    ├── components/
 │    ├── context/
 │    ├── hooks/
 │    ├── pages/
 │    ├── services/
 │    ├── types/
 │    └── utils/

La gestión global del estado se realiza mediante Context API.

Base de datos:

La aplicación utiliza Supabase con PostgreSQL.

Tablas principales:

profiles
exercises
exercises_templates
sessions
session_sets
rms
friendships

Variables de entorno:

Frontend (.env.local)

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_key

Instalación local:
Frontend:

cd client
npm install
npm run dev

Backend:
npm install
npm run dev

Mejoras implementadas recientemente:

Sistema de autenticación con Supabase
Persistencia real en la nube
Importación de ejercicios base
Imágenes en ejercicios
Modo oscuro
Edición de sesiones
Repetición de sesiones
Asociación automática de RM
Integración completa con Supabase

Mejoras futuras:

Corto plazo:
Agrupar múltiples ejercicios en una misma sesión diaria
Sistema de check para marcar series completadas
Mejoras visuales en historial
Estadísticas de progreso

Medio plazo:
Sistema de amigos
Comparación de marcas
Compartir rutinas
Feed social

Largo plazo:
Aplicación móvil
Notificaciones
IA para recomendaciones de entrenamiento
Estadísticas avanzadas
Sincronización en tiempo real

Objetivo técnico del proyecto:

El proyecto no solo busca cumplir objetivos académicos, sino simular una aplicación real escalable, moderna y preparada para evolucionar hacia un producto profesional.

Autor

Raúl A. Martín Amores

Proyecto Final DAM - GymLog
