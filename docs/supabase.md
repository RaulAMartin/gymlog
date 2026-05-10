## Sistema de usuarios

Se ha añadido autenticación con Supabase Auth.

Archivos principales:

```txt
client/src/context/AuthContext.tsx
client/src/pages/AuthPage.tsx
client/src/components/ProtectedRoute.tsx

Funcionalidades implementadas:

registro de usuario
inicio de sesión
cierre de sesión
sesión persistente
rutas protegidas
perfil automático mediante trigger en Supabase

La aplicación redirige a /auth cuando el usuario no ha iniciado sesión.

## Ejercicios conectados con Supabase

Se ha conectado la tabla `exercises` de Supabase con el frontend.

A partir de este paso, los ejercicios creados por el usuario se guardan en Supabase asociados a su `user_id`.

Archivos añadidos:

```txt
client/src/services/exerciseSupabaseService.ts

El contexto global GymLogContext carga los ejercicios desde Supabase cuando hay un usuario autenticado.

Las políticas RLS hacen que cada usuario solo pueda consultar y crear sus propios ejercicios.

## Ejercicios base

Se ha añadido la tabla `exercise_templates` como biblioteca de ejercicios base.

Estos ejercicios pueden ser importados por el usuario a su biblioteca personal.

Archivos principales:

```txt
client/src/services/exerciseTemplateSupabaseService.ts
client/src/components/ExerciseTemplateList.tsx

La importación copia el ejercicio base a la tabla exercises, asociándolo al user_id del usuario autenticado.

## RM persistentes

Los RM ahora se almacenan en Supabase asociados al usuario autenticado.

Tabla utilizada:

```txt
rms

Cada usuario solo puede acceder a sus propios RM mediante políticas RLS.

Servicios creados:

client/src/services/rmSupabaseService.ts

## Sesiones conectadas con Supabase

Las sesiones de entrenamiento se han conectado con Supabase.

Tablas utilizadas:

```txt
sessions
session_exercises
session_sets

Cada sesión pertenece a un usuario mediante user_id.

Cuando se crea una sesión:

Se crea un registro en sessions.
Se crean los ejercicios asociados en session_exercises.
Se crean las series en session_sets.

El historial carga las sesiones desde Supabase y permite editarlas, repetirlas y eliminarlas.

