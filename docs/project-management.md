# Organización del proyecto

## Metodología elegida

Para organizar el desarrollo de GymLog se utilizará una metodología Kanban mediante Trello.

He elegido Kanban porque el proyecto será desarrollado de forma individual y permite organizar las tareas de manera visual, sencilla y flexible. Al no trabajar con un equipo grande, no es necesario utilizar una estructura tan cerrada como Scrum con roles y sprints definidos.

Kanban permite dividir el proyecto en tareas pequeñas, moverlas según su estado y tener una visión clara del avance.

## Herramienta utilizada

La herramienta utilizada para la gestión del proyecto será Trello.

El tablero se dividirá en las siguientes columnas:

- **Backlog**: funcionalidades, mejoras e ideas pendientes de planificar.
- **Todo**: tareas seleccionadas para desarrollar próximamente.
- **In Progress**: tareas que se están desarrollando en ese momento.
- **Review**: tareas terminadas que necesitan revisión, pruebas o corrección.
- **Done**: tareas finalizadas y revisadas.

## Organización de tareas

Cada funcionalidad principal de la aplicación se dividirá en tarjetas. Dentro de cada tarjeta se añadirán subtareas técnicas mediante checklists.

Las tarjetas principales del proyecto serán:

- Documentación inicial del proyecto
- Preparación del proyecto frontend
- Preparación del backend/API
- Biblioteca de ejercicios
- Registro de sesiones de entrenamiento
- Registro de RM por ejercicio
- Calculadora de pesos recomendados
- Historial y estadísticas
- Rutas y navegación
- Formularios y validaciones
- Context y estado global
- Cliente de API tipado
- Documentación de la API
- Testing manual
- Despliegue
- Mejoras futuras

## Flujo de trabajo

El flujo de trabajo será el siguiente:

1. Las ideas y funcionalidades se colocarán primero en Backlog.
2. Cuando una tarea vaya a desarrollarse, se moverá a Todo.
3. Al comenzar a trabajar en ella, se moverá a In Progress.
4. Cuando esté implementada, se moverá a Review.
5. Tras probarla y corregir errores, se moverá a Done.

## Adaptación de la idea tras feedback del tutor

Tras recibir feedback del tutor, se ha ampliado la idea inicial de GymLog.

Además de registrar sesiones de gimnasio, la aplicación incluirá una biblioteca de ejercicios donde el usuario podrá crear ejercicios personalizados y asociarles tags como "tren superior", "push" o "pecho". Esto permitirá filtrar ejercicios de manera más útil.

También se añadirá la posibilidad de registrar el RM de cada ejercicio. A partir de este dato, la aplicación podrá sugerir pesos recomendados según el tipo de entrenamiento, por ejemplo:

- RM 100%
- Fuerza 80%
- Bodybuilding 60%
- Cardio 40%

Como posible mejora futura, si se utiliza una base de datos sincronizada como Supabase, MongoDB o Firebase, se podría implementar un sistema de usuarios y amigos para comparar marcas o compartir rutinas. Esta funcionalidad se considera una mejora futura porque aumentaría la complejidad del proyecto, pero tendría potencial para hacerlo más escalable y profesional.

## Enlace al tablero

El enlace al tablero de Trello:

https://trello.com/invite/b/69edf0b2980464ab42ede459/ATTI0671917e8391d0fc3172fb0b6bb98d7d0F411BC4/gymlog-desarrollo