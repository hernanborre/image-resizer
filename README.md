# Image Resizer

Servicio para el redimensionamiento de imágenes a través de endpoints REST.

## Descripción
Este servicio permite redimensionar imágenes a través de dos endpoints diferentes, ofreciendo flexibilidad para el procesamiento de imágenes según las necesidades del usuario.

## Endpoints
Se pueden consultar y probar ambos endpoints a través de la definición de OpenAPI disponible luego de ejecutar el proyectos en: 
[OpenAPI Specification](http://localhost:3001/api-docs)

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
- Docker y Docker compose

## Pre-ejecución
1. Tener instalado Docker y Docker Compose.
2. Si se desea, se puede instanciar la DB Mongo v4.4 desde el archivo docker-compose.yml que se encuentra en la raíz del proyecto con `docker compose up -d`
3. Ejecutar el comando `npm run seed` para crear la base de datos y las tareas de prueba.


!IMPORTANTE! 
Si se deseara limpiar todos los registros de la base de datos, se puede ejecutar el comando `npm run cleanup`.
Esto hará que se eliminen todos los registros de la base de datos, incluyendo las imágenes redimensionadas previamente.


## Instalación
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` basado en `.env.example`
4. Ejecutar: `npm run dev`



