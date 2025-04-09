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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const child_process_1 = require("child_process");
const dotenv = __importStar(require("dotenv"));
const util_1 = require("util");
dotenv.config();
const execPromise = (0, util_1.promisify)(child_process_1.exec);
/**
* @Everto Farias
* @description: Creamos una instancia para conectarnos a la base de datos de postgres para crear la base de datos si no existe.
* Luego verificamos si la base de datos existe y si no existe la creamos.
* Ejecutamos las migraciones pendientes para poder usar la aplicacion.
* @TODO: EN CASO DE LA QUE CONEXION A POSTGRES FALLE SE DEBERA INGRESAR MANUAL AL MOTOR DE POSTGRESQL Y EJECUTAR
* CREATE DATABASE posts;
* y Luego correr las migraciones por separado con el comando run migration
*/
const initDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        host: process.env.DB_HOST,
        port: 5432,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'postgres'
    });
    try {
        yield client.connect();
        const res = yield client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}'`);
        if (res.rowCount === 0) {
            console.log(`Creando base de datos ${process.env.DB_DATABASE}...`);
            yield client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
            console.log('Base de datos creada con éxito');
        }
        else {
            console.log(`La base de datos ${process.env.DB_DATABASE} ya existe`);
        }
        console.log('Ejecutando migraciones...');
        const { stdout, stderr } = yield execPromise('npm run migration:run');
        if (stderr) {
            console.error(`Error de migraciones: ${stderr}`);
        }
        console.log(`Migraciones ejecutadas: ${stdout}`);
    }
    catch (err) {
        console.error('Error:', err);
    }
    finally {
        yield client.end();
    }
});
initDatabase();
