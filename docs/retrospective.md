# Retrospectiva final

## Introducción

En esta fase se ha desarrollado GymLog, una aplicación web fullstack orientada al registro de entrenamientos de gimnasio.

El proyecto integra un frontend desarrollado con React, TypeScript, Vite y Tailwind CSS, junto con un backend/API creado con Node.js y Express.

El objetivo principal ha sido aplicar los conocimientos adquiridos en fases anteriores y conectarlos en una aplicación completa, organizada y documentada.

## Qué he aprendido

Durante el desarrollo del proyecto he aprendido a organizar una aplicación fullstack separando claramente frontend, backend y documentación.

En la parte frontend he practicado:

- creación de componentes reutilizables con React
- uso de TypeScript para tipar props y datos
- aplicación de estilos con Tailwind CSS
- creación de rutas con React Router
- uso de formularios controlados
- validación básica de campos
- gestión de estados de carga, éxito y error
- uso de hooks como useState, useEffect, useMemo y useCallback
- creación de un custom hook
- uso de Context API para estado global

En la parte backend he practicado:

- creación de un servidor con Express
- organización por capas
- rutas
- controladores
- servicios
- datos simulados
- validaciones básicas
- respuestas HTTP correctas
- creación de una API REST

También he aprendido a documentar el proyecto de forma más profesional usando archivos Markdown dentro de la carpeta `docs`.

## Conexión entre frontend y backend

Una de las partes más importantes del proyecto ha sido conectar el frontend con el backend.

El backend expone una API REST con endpoints como:

```txt
GET /api/v1/exercises
POST /api/v1/exercises
GET /api/v1/sessions
POST /api/v1/rms

El frontend consume esa API mediante un cliente tipado creado en:

client/src/api/client.ts

Gracias a este cliente, los componentes no hacen llamadas fetch directamente. La comunicación con el backend queda centralizada y más ordenada.

Los tipos principales se definieron en:

client/src/types/gym.ts

Esto ayuda a que los datos del frontend estén alineados con los datos que devuelve la API.

Arquitectura utilizada

El proyecto se ha organizado en dos partes principales:

client/
server/

El frontend contiene carpetas como:

components/
pages/
hooks/
context/
types/
utils/
api/

El backend contiene:

routes/
controllers/
services/
data/

Esta separación permite mantener el código más ordenado y facilita futuras mejoras.

Problemas encontrados

Durante el desarrollo surgieron varios problemas.

Uno de los primeros fue la configuración de Tailwind CSS. Al usar una versión más reciente, algunos comandos clásicos no funcionaban igual, por lo que fue necesario ajustar la instalación.

También aparecieron errores con Git al intentar subir el proyecto a GitHub, porque el repositorio remoto ya tenía contenido. Para solucionarlo fue necesario hacer un pull con historiales no relacionados y completar el merge.

Otro problema fue la ejecución simultánea del frontend y el backend. En algunos casos Vite cambió el puerto del frontend de 5173 a 5174 porque el puerto principal estaba ocupado.

También hubo errores de rutas en backend por nombres de archivos mal escritos, como diferencias entre sesionRoutes.js y sessionRoutes.js.

En el despliegue, fue necesario separar correctamente el frontend y el backend, configurar Render para la API y Vercel para el frontend. Además, se tuvo que usar una variable de entorno para que el frontend pudiera comunicarse con la API desplegada.

Soluciones aplicadas

Para resolver estos problemas se aplicaron varias soluciones:

revisar los errores de la terminal
corregir nombres de archivos
comprobar rutas y carpetas
usar dos terminales separadas para frontend y backend
configurar variables de entorno
documentar cada paso realizado
probar la aplicación manualmente tras cada cambio importante
Uso de IA durante el desarrollo

Durante el desarrollo se utilizó IA como apoyo para organizar el proyecto, resolver errores y redactar documentación.

La IA ayudó principalmente en:

estructurar los documentos Markdown
organizar el tablero Kanban de Trello
plantear la arquitectura del proyecto
generar ejemplos de componentes React
revisar errores de terminal
explicar comandos de Git
documentar la API
preparar el despliegue
redactar esta retrospectiva

El uso de IA no sustituyó el trabajo de desarrollo, sino que sirvió como herramienta de apoyo para entender mejor los pasos, detectar errores y avanzar de forma más ordenada.

Testing realizado

Se realizaron pruebas manuales de las funcionalidades principales:

navegación entre páginas
página 404
carga de ejercicios desde la API
creación de ejercicios
validaciones de formularios
filtros por nombre y tag
formulario de RM
cálculo de pesos recomendados
endpoints del backend
diseño responsive
revisión de consola

Estas pruebas quedaron documentadas en:

docs/testing.md
Despliegue

El frontend se desplegó en Vercel:

https://gymlog-sage.vercel.app/

El backend se desplegó en Render:

https://gymlog-api-5yup.onrender.com

La API base utilizada en producción es:

https://gymlog-api-5yup.onrender.com/api/v1
Limitaciones actuales

La principal limitación actual es que el backend guarda los datos en memoria. Esto significa que los datos creados pueden perderse si el servidor se reinicia.

Otra limitación es que todavía no existe autenticación de usuarios, por lo que la aplicación funciona como una versión inicial sin cuentas personales.

Posibles mejoras futuras

En futuras versiones se podrían añadir:

base de datos real
autenticación de usuarios
sistema de amigos
comparación de marcas
rutinas compartidas
gráficos de progreso
historial más completo
edición avanzada de sesiones
integración con una API externa de ejercicios
documentación Swagger/OpenAPI
Conclusión final

El proyecto GymLog ha permitido unir los conocimientos de frontend y backend en una aplicación completa.

Durante el desarrollo se han trabajado conceptos importantes como componentes, hooks, Context API, rutas, formularios, API REST, arquitectura por capas, cliente de API tipado, testing manual y despliegue.

Aunque la aplicación todavía podría mejorar con una base de datos real y autenticación, la versión actual cumple el objetivo principal de la fase: crear una aplicación fullstack organizada, documentada y desplegada.


---

# 3. Revisar que tienes todos los documentos

En la carpeta `docs` deberías tener:

```txt
agile.md
idea.md
project-management.md
design.md
components.md
hooks.md
context.md
routing.md
forms.md
api.md
api-client.md
testing.md
deployment.md
retrospective.md
