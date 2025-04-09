# 📌 Posts App API

## Descripción 📋

API para la gestión de *posts* personalizados. Permite crear, listar y eliminar publicaciones.

## Pre-requisitos ⚙️

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/) versión 18.20.3

Para que la aplicación funcione correctamente, necesitas configurar algunas variables de entorno. En la raíz del proyecto, crea un archivo llamado .env (si no lo tienes ya) y agrega las siguientes variables de entorno:

```env
DB_HOST=localhost               # Dirección del servidor de base de datos
DB_PORT=5432                    # Puerto de la base de datos (por defecto 5432)
DB_USERNAME=tu_usuario          # Nombre de usuario para la base de datos
DB_PASSWORD=tu_contraseña       # Contraseña para el usuario de la base de datos
DB_DATABASE=posts               # Nombre de la base de datos que utilizará la aplicación
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

Si necesitas más detalles y documentación sobre las rutas, puedes acceder a la interfaz de Swagger en la siguiente URL:

**Documentación de la API (Swagger): `/api-docs`**

Ahí encontrarás una descripción más detallada de las rutas, los parámetros de entrada y las respuestas esperadas. La documentación está actualizada y es interactiva, lo que te permitirá probar las rutas directamente desde el navegador.

| Método | Ruta           | Descripción                       |
|--------|----------------|-----------------------------------|
| GET    | `/api-docs`    | Documentación interactiva Swagger |
| POST   | `/posts`       | Crear un nuevo post               |
| GET    | `/posts`       | Obtener todos los posts           |
| GET    | `/posts/:id`   | Obtener un post por ID            |
| PUT    | `/posts/:id`   | Actualizar un post por ID         |
| DELETE | `/posts/:id`   | Eliminar un post por ID           |


> Todas las rutas aceptan y responden con JSON.

## Despliegue 🌐

Accede a la API desplegada en la siguiente URL:

🔗 [API Principal](https://api-post-7xoj.onrender.com)

Y para la documentación interactiva de la API:

🔗 [Documentación de la API (Swagger)](https://api-post-7xoj.onrender.com/api-docs)


## Autores ✒️

- **Everto Farías** ❤️

