import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import * as dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const baseFolder = isProd ? "dist" : "src";

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