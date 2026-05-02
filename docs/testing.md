# Testing y mejoras

## Introducción

En este documento se recogen las pruebas manuales realizadas en GymLog.

El objetivo ha sido comprobar que las funcionalidades principales funcionan correctamente, que la interfaz responde bien en distintos tamaños de pantalla y que no existen errores importantes en consola.

## Entorno de pruebas

Las pruebas se han realizado en entorno local.

Frontend:

```txt
http://localhost:5173

Backend:

http://localhost:3000

En algunos casos, Vite puede iniciar el frontend en otro puerto si el 5173 está ocupado, por ejemplo:

http://localhost:5174
Herramientas utilizadas
Navegador web
Consola del navegador
Thunder Client
Visual Studio Code
Terminal integrada
Trello
Pruebas de navegación

Se probaron las páginas principales de la aplicación:

Dashboard
Ejercicios
Nueva sesión
Historial
Marcas RM
Resultado

Todas las rutas cargan correctamente y el menú permite navegar entre las distintas páginas.

Prueba de página 404

Se accedió a una ruta inexistente.

Ejemplo:

/ruta-falsa
Resultado

La aplicación muestra correctamente una página 404 con opción para volver al inicio.

Pruebas de carga de ejercicios

Se accedió a:

/exercises

La aplicación cargó los ejercicios desde la API:

GET /api/v1/exercises
Resultado

Los ejercicios se muestran correctamente en tarjetas con nombre, grupo muscular y tags.

Pruebas de creación de ejercicios

Se creó un nuevo ejercicio desde el formulario.

Datos usados:

Nombre: Curl bíceps
Grupo muscular: Bíceps
Tags: tren superior, pull, brazo
Resultado

El ejercicio se añadió correctamente a la lista y también apareció en la respuesta de la API.

Pruebas de validación del formulario de ejercicios

Se probaron los siguientes casos:

formulario sin nombre
formulario sin grupo muscular
formulario sin tags
Resultado

La aplicación mostró mensajes de error y no creó ejercicios inválidos.

Pruebas de búsqueda y filtros

Se probaron:

búsqueda por nombre
filtrado por tag
limpieza de filtros
Resultado

La lista de ejercicios se actualiza correctamente según la búsqueda y el tag seleccionado.

Pruebas del formulario de RM

Se probó el formulario de RM introduciendo:

Ejercicio: Press banca
RM: 100
Resultado

La aplicación mostró las recomendaciones de peso:

RM 100%
Fuerza 80%
Bodybuilding 60%
Cardio 40%
Pruebas de validación del formulario RM

Se probaron estos casos:

enviar sin seleccionar ejercicio
enviar sin introducir RM
introducir RM igual a 0
introducir RM negativo
Resultado

La aplicación mostró mensajes de error correspondientes.

Pruebas de backend con Thunder Client

Se probaron endpoints principales:

GET /api/v1/exercises
POST /api/v1/exercises
GET /api/v1/sessions
POST /api/v1/rms

También se probaron peticiones inválidas para comprobar respuestas 400 Bad Request.

Resultado

La API responde correctamente con códigos HTTP adecuados:

200
201
400
404
Revisión de consola

Se abrió la consola del navegador durante el uso de la aplicación.

Resultado

No se detectaron errores críticos en consola durante las pruebas principales.

Pruebas responsive

Se probó la aplicación en distintos tamaños de pantalla usando las herramientas de desarrollo del navegador.

Tamaños probados:

móvil
tablet
escritorio
Resultado

El diseño se adapta correctamente. Las tarjetas, formularios y navegación siguen siendo utilizables en pantallas pequeñas.

Mejoras aplicadas

Durante las pruebas se detectó que algunos cálculos de pesos podían mostrar demasiados decimales.

Se aplicó una mejora en:

client/src/utils/calculateWeights.ts

Ahora los pesos recomendados se redondean a un decimal.

Limitaciones detectadas

Actualmente los datos se guardan en memoria en el backend. Esto significa que al reiniciar el servidor se pierden los datos creados durante la prueba.

Esta limitación se acepta en esta versión inicial, pero en el futuro se podría solucionar con una base de datos real como Supabase, MongoDB o Firebase.

Conclusión

Las pruebas manuales confirman que las funcionalidades principales de GymLog funcionan correctamente.

La aplicación permite navegar entre páginas, cargar ejercicios desde la API, crear ejercicios, filtrar la biblioteca, registrar RM y calcular pesos recomendados.
