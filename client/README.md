# GymLog

GymLog es una aplicación web fullstack para registrar entrenamientos de gimnasio, gestionar una biblioteca de ejercicios y calcular recomendaciones de peso a partir del RM del usuario.

## Descripción

La aplicación permite consultar y crear ejercicios, asociarles tags, filtrar ejercicios por nombre o categoría, registrar marcas RM y calcular pesos recomendados según distintos objetivos de entrenamiento.

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express
- API REST
- CORS

### Organización y documentación

- Trello
- GitHub
- Markdown
- Vercel
- Render

## Estructura del proyecto

```txt
gym-tracker-app/
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── hooks/
│       ├── pages/
│       ├── types/
│       └── utils/
├── server/
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   ├── services/
│   └── index.js
├── docs/
└── README.md
Funcionalidades principales
Biblioteca de ejercicios
Creación de nuevos ejercicios
Tags para clasificar ejercicios
Búsqueda de ejercicios por nombre
Filtro de ejercicios por tag
Registro de RM
Cálculo de pesos recomendados
Navegación con React Router
Página 404
API REST con Express
Cliente de API tipado en frontend
Estados de carga, éxito y error
Despliegue

Frontend desplegado en Vercel:

https://gymlog-sage.vercel.app/

Backend/API desplegado en Render:

https://gymlog-api-5yup.onrender.com

Endpoint principal de la API:

https://gymlog-api-5yup.onrender.com/api/v1
Endpoints principales
Ejercicios
GET /api/v1/exercises
POST /api/v1/exercises
GET /api/v1/exercises/:id
PUT /api/v1/exercises/:id
DELETE /api/v1/exercises/:id
Sesiones
GET /api/v1/sessions
POST /api/v1/sessions
GET /api/v1/sessions/:id
PUT /api/v1/sessions/:id
DELETE /api/v1/sessions/:id
RM
GET /api/v1/rms
POST /api/v1/rms
GET /api/v1/rms/:id
DELETE /api/v1/rms/:id
Instalación en local

Clonar el repositorio:

git clone URL_DEL_REPOSITORIO
cd gym-tracker-app

Instalar y ejecutar backend:

cd server
npm install
npm run dev

El backend se ejecutará en:

http://localhost:3000

Instalar y ejecutar frontend en otra terminal:

cd client
npm install
npm run dev

El frontend se ejecutará normalmente en:

http://localhost:5173

Si el puerto está ocupado, Vite puede usar otro, por ejemplo:

http://localhost:5174
Variable de entorno del frontend

En producción se utiliza la variable:

VITE_API_BASE_URL

Con el valor:

https://gymlog-api-5yup.onrender.com/api/v1
Documentación

La documentación del proyecto está en la carpeta docs/.

Incluye:

investigación Agile
idea del proyecto
gestión del proyecto
arquitectura
componentes
hooks
context
rutas
formularios
API
cliente de API
testing
despliegue
Limitaciones actuales

Actualmente el backend guarda los datos en memoria. Esto significa que los datos nuevos pueden perderse si el servidor se reinicia.

Como mejora futura se podría añadir una base de datos real como Supabase, MongoDB o Firebase.

Mejoras futuras
Autenticación de usuarios
Base de datos real
Sistema de amigos
Comparación de marcas
Rutinas compartidas
Gráficos avanzados de progreso
Integración con una API externa de ejercicios
Autor

Proyecto realizado como práctica del grado de Desarrollo de Aplicaciones Multiplataforma por Raúl Antonio Martín Amores

Trello: https://trello.com/invite/b/69edf0b2980464ab42ede459/ATTI0671917e8391d0fc3172fb0b6bb98d7d0F411BC4/gymlog-desarrollo

Vercel: https://gymlog-sage.vercel.app/

Render: https://gymlog-api-5yup.onrender.com