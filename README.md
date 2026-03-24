# Todo App

Este proyecto es una aplicación de gestión de tareas (Todo App) compuesta por un backend (API REST) y un frontend (interfaz de usuario web).

## Estructura del Proyecto

- **backend/**: API REST construida con Node.js, Express y TypeScript. Gestiona usuarios, autenticación y tareas (todos), y utiliza MongoDB como base de datos.
- **frontend/**: Aplicación web construida con React, Vite y TypeScript. Permite a los usuarios interactuar con la API para gestionar sus tareas.

---

## Backend

- **Tecnologías principales:**
  - Node.js, Express, TypeScript
  - MongoDB (Mongoose)
  - Autenticación JWT
  - Swagger para documentación de la API
- **Ubicación:** `backend/`
- **Scripts principales:**
  - `npm run start:dev`: Inicia el servidor en modo desarrollo con recarga automática.
- **Configuración:**
  - Variables de entorno en `.env`
  - Configuración de base de datos en `src/config/db.ts`
- **Estructura de carpetas:**
  - `modules/`: Módulos de dominio (auth, todo, user)
  - `middlewares/`, `utils/`, `config/`

---

## Frontend

- **Tecnologías principales:**
  - React, Vite, TypeScript
  - Tailwind CSS para estilos
- **Ubicación:** `frontend/`
- **Scripts principales:**
  - `npm run dev`: Inicia la app en modo desarrollo
  - `npm run build`: Compila la app para producción
- **Estructura de carpetas:**
  - `src/`: Componentes y lógica principal
  - `public/`: Archivos estáticos

---

## Instalación y Ejecución

1. **Clonar el repositorio**
2. **Instalar dependencias**
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
3. **Configurar variables de entorno**
   - Backend: crear archivo `.env` en `backend/` según ejemplo
   - Frontend: crear archivo `.env` en `frontend/` según ejemplo
4. **Ejecutar ambos servidores**
   - Backend: `npm run start:dev` (por defecto en puerto 4000)
   - Frontend: `npm run dev` (por defecto en puerto 3000)

## Docker Compose

Puedes levantar toda la aplicación desde la raíz del proyecto.

1. Crea `backend/.env` a partir de `backend/.env.template`
2. Configura al menos:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `REFRESH_TOKEN_SECRET`
   - `REFRESH_TOKEN_EXPIRES_IN`
3. Ejecuta:
   - `docker compose up --build`

La configuración Docker usa un único `Dockerfile` con dos targets:
- `backend`
- `frontend`

Servicios disponibles:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- Swagger: `http://localhost:4000/docs`
