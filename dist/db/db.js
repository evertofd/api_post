"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("../entities/Post");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const isProd = process.env.NODE_ENV === "production";
const baseFolder = isProd ? "dist" : "src";
/**
* @Everto Farias
* @description: Configuración de la conexión a la base de datos PostgreSQL mediante TypeORM. Detecta el entorno actual (producción o desarrollo) a través de la variable NODE_ENV para determinar la estructura de carpetas correcta después del proceso de build de producción.
* @param: Variables de entorno para datos de conexión (host, usuario, contraseña, nombre de BD)
* @return: Objeto AppDataSource que establece la conexión con la base de datos y gestiona entidades
*/
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Post_1.Post],
    migrations: [`${baseFolder}/migrations/*.{ts,js}`],
    migrationsTableName: "migrations_history",
    synchronize: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
