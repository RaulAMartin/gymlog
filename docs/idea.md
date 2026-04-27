# Idea del proyecto: GymLog

## Descripción general

La idea del proyecto es desarrollar una aplicación web para registrar sesiones de entrenamiento de gimnasio. El usuario podrá guardar información de cada entrenamiento, incluyendo ejercicios realizados, número de series, repeticiones, peso utilizado y observaciones.

La aplicación servirá para llevar un seguimiento del progreso de forma sencilla y ordenada, evitando tener que apuntar los entrenamientos en papel, notas sueltas o aplicaciones demasiado complejas.

## Problema que intenta resolver

Muchas personas que entrenan en el gimnasio no llevan un control claro de sus sesiones. A veces recuerdan los ejercicios que hicieron, pero no el peso exacto, las repeticiones o si han mejorado respecto a semanas anteriores.

Esto provoca varios problemas:

- dificultad para medir el progreso
- desorganización de las rutinas
- pérdida de información entre sesiones
- menor motivación al no ver la evolución de forma clara

La aplicación busca resolver esto ofreciendo un sistema simple para registrar y consultar entrenamientos.

## Usuario objetivo

El proyecto está pensado principalmente para:

- personas que entrenan en gimnasio de forma habitual
- usuarios principiantes que quieren empezar a organizar sus entrenamientos
- personas que quieren seguir su progreso en fuerza o resistencia
- usuarios que prefieren una aplicación sencilla antes que una plataforma demasiado avanzada

## Funcionalidades principales

- crear una sesión de entrenamiento
- añadir ejercicios a una sesión
- indicar series, repeticiones y peso en cada ejercicio
- guardar observaciones o notas
- ver el historial de sesiones anteriores
- consultar el detalle de una sesión concreta
- editar o eliminar sesiones
- mostrar estadísticas básicas, por ejemplo número total de entrenamientos o evolución en un ejercicio

## Funcionalidades opcionales

- filtrar sesiones por fecha
- buscar ejercicios por nombre
- marcar ejercicios favoritos
- usar plantillas de rutinas
- mostrar gráficos simples de progreso
- añadir duración del entrenamiento
- dividir sesiones por grupos musculares
- modo oscuro
- exportar datos

## Uso de API y almacenamiento

La aplicación puede desarrollarse sin necesidad de base de datos obligatoria. Como primera versión, los datos se podrían almacenar con LocalStorage o con un backend sencillo en Express que devuelva datos de ejemplo y permita gestionar sesiones mediante una API REST.

La idea es tener una estructura fullstack donde el frontend consuma una API para obtener, crear, editar y eliminar entrenamientos, aunque inicialmente el proyecto pueda funcionar con datos simulados.

## Posibles mejoras futuras

En futuras versiones se podrían añadir:

- autenticación de usuarios
- base de datos real
- seguimiento del progreso por ejercicio con gráficos más completos
- planificación semanal de rutinas
- registro de medidas corporales
- integración con aplicaciones de salud o deporte
- sistema de objetivos personales
- recomendaciones automáticas según historial de entrenamientos

## Motivo de elección del proyecto

He elegido esta idea porque es una aplicación útil, clara y realista para desarrollar en esta fase. Permite aplicar React con TypeScript y Tailwind en la parte visual, y también un backend con Express para practicar rutas, controladores, servicios y comunicación mediante API.

Además, es un proyecto lo bastante completo como para demostrar organización, desarrollo frontend y backend, pero sin ser excesivamente grande para el tiempo disponible.

## Ampliación de la idea tras feedback

Tras recibir feedback, se amplía la idea inicial para que la aplicación tenga más valor técnico y de producto.

Además de registrar entrenamientos, GymLog incluirá una biblioteca de ejercicios. El usuario podrá añadir ejercicios personalizados y asociarles tags como "tren superior", "push", "pull", "pecho", "espalda" o "pierna". Estos tags permitirán filtrar y organizar mejor los ejercicios.

También se añadirá un sistema de registro de RM por ejercicio. El RM representa la repetición máxima o marca máxima del usuario en un ejercicio concreto. A partir de este dato, la aplicación podrá sugerir pesos recomendados para distintos tipos de entrenamiento:

- RM 100%
- Fuerza 80%
- Bodybuilding 60%
- Cardio 40%

Como mejora futura, si se utiliza una base de datos sincronizada como Supabase, MongoDB o Firebase, se podría crear un sistema de usuarios y amigos para comparar marcas, compartir rutinas o ver progresos. Esta parte se deja como posible evolución del proyecto para mantener una primera versión realista.
