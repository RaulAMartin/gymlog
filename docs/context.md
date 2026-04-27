# Context API y estado global

## Introducción

En GymLog se utiliza Context API para compartir estado global entre componentes.

Context API permite evitar pasar props manualmente por muchos niveles de componentes. Esto hace que el código sea más limpio cuando varios componentes necesitan acceder a los mismos datos.

## Archivo principal

El contexto se ha creado en:

```txt
client/src/context/GymLogContext.tsx
