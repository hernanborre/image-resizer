# Image Resizer

Servicio para el redimensionamiento de imágenes a través de endpoints REST.

## Descripción
Este servicio permite redimensionar imágenes a través de dos endpoints diferentes, ofreciendo flexibilidad para el procesamiento de imágenes según las necesidades del usuario.

## Endpoints


### 1. Redimensionar una imagen por POST form-part file
POST /tasks

### 2. Obtener información de una tarea, incluyendo las imágenes redimensionadas
GET /tasks/:taskId

## Tecnologías Utilizadas
- Node.js
- Express
- Sharp (para el procesamiento de imágenes)
- TypeScript
- MongoDB
- Docker

## Requisitos
- Node.js 20.18 o superior
- npm 10.9 o superior

## Instalación
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` basado en `.env.example`
4. Ejecutar: `npm run dev`




