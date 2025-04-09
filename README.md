# 📌 Posts App API

## Descripción 📋

API para la gestión de *posts* personalizados. Permite crear, listar y eliminar publicaciones.

## Pre-requisitos ⚙️

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/) versión 18.20.3

También debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=posts
PORT=3000
```

## Comenzando 🚀

Para iniciar el proyecto localmente:

1. Clona este repositorio.
2. Ingresa al directorio del proyecto.
3. Instala las dependencias:

```bash
npm install
```

4. Configura la base de datos (asegúrate de haber creado previamente el archivo `.env` con los datos correctos):

### Opción 1: Creación automática de la base de datos y tablas

```bash
npm run db:init       # Crea la base de datos
npm run migration:run # Aplica las migraciones necesarias
```

### Opción 2: Creación manual

1. Abre tu terminal o PgAdmin y ejecuta:

```sql
CREATE DATABASE posts;
```

2. Luego, en la terminal del proyecto, corre:

```bash
npm run migration:run
```

Esto creará las tablas necesarias en la base de datos.

5. Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

6. Para generar el *build* de producción:

```bash
npm run build
npm start
```

Esto creará una carpeta `dist/` con los archivos transpilados listos para producción.

## Construido con 🛠️

- [Node.js](https://nodejs.org/es/)
- [Express](https://expressjs.com/es/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Dependencias del Proyecto 🔗

Esta API está pensada para ser utilizada junto al frontend:

- [Frontend - Posts App](https://github.com/evertofd/client_posts?tab=readme-ov-file)

## Rutas de la API 📡

| Método | Ruta           | Descripción                       |
|--------|----------------|-----------------------------------|
| POST   | `/posts`       | Crear un nuevo post               |
| GET    | `/posts`       | Obtener todos los posts           |
| GET    | `/posts/:id`   | Obtener un post por ID            |
| PUT    | `/posts/:id`   | Actualizar un post por ID         |
| DELETE | `/posts/:id`   | Eliminar un post por ID           |

> Todas las rutas aceptan y responden con JSON.

## Despliegue 🌐

🔗 [https://api-post-7xoj.onrender.com](https://api-post-7xoj.onrender.com)


## Autores ✒️

- **Everto Farías** ❤️

