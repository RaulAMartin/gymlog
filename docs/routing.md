# Rutas y navegación

## Introducción

GymLog utiliza React Router para gestionar la navegación entre páginas.

Esto permite dividir la aplicación en diferentes vistas y mejorar la organización del frontend.

## Librería utilizada

La librería utilizada es:

```txt
react-router-dom
Archivo principal de rutas

Las rutas se configuran en:

client/src/App.tsx
Layout principal

La aplicación utiliza un componente Layout en:

client/src/components/Layout.tsx

Este componente contiene:

la barra de navegación
el contenedor principal
el componente Outlet de React Router
Barra de navegación

La navegación se implementa en:

client/src/components/Navbar.tsx

Se utiliza NavLink para poder aplicar estilos diferentes a la ruta activa.

Rutas principales
Ruta	Página	Descripción
/	Dashboard	Página inicial con resumen general
/exercises	Ejercicios	Biblioteca de ejercicios
/sessions/new	Nueva sesión	Formulario para crear entrenamiento
/history	Historial	Historial de sesiones
/rm	Marcas RM	Registro de marcas y recomendaciones
*	404	Página para rutas no existentes
Páginas creadas

Las páginas se encuentran en:

client/src/pages

Archivos:

DashboardPage.tsx
ExercisesPage.tsx
NewSessionPage.tsx
HistoryPage.tsx
RMPage.tsx
NotFoundPage.tsx
Página 404

Se ha creado una página 404 para controlar rutas incorrectas.

Esto mejora la experiencia del usuario porque evita que la aplicación muestre una pantalla vacía cuando se accede a una URL no válida.

Conclusión

Con React Router, GymLog queda dividida en varias páginas claras. Esto facilita escalar la aplicación y añadir nuevas funcionalidades en el futuro.


---

# 9. Guardar cambios en Git

Desde la raíz:

```bash
git add .
git commit -m "feat: add routing and navigation"
git push
