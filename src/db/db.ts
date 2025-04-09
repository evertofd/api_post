import { DataSource } from "typeorm";
import { Post } from "../entities/Post";
import * as dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const baseFolder = isProd ? "dist" : "src";

/**
* @Everto Farias
* @description: Configuración de la conexión a la base de datos PostgreSQL mediante TypeORM. Detecta el entorno actual (producción o desarrollo) a través de la variable NODE_ENV para determinar la estructura de carpetas correcta después del proceso de build de producción.
* @param: Variables de entorno para datos de conexión (host, usuario, contraseña, nombre de BD)
* @return: Objeto AppDataSource que establece la conexión con la base de datos y gestiona entidades
*/

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Post],
    migrations: [`${baseFolder}/migrations/*.{ts,js}`],
    migrationsTableName: "migrations_history",
    synchronize: false,
});