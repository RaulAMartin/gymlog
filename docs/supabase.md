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
