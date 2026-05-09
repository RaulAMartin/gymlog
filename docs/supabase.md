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
