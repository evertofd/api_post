import { Client } from 'pg';
import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import { promisify } from 'util';

dotenv.config();
const execPromise = promisify(exec);

/**
* @Everto Farias
* @description: Creamos una instancia para conectarnos a la base de datos de postgres para crear la base de datos si no existe.
* Luego verificamos si la base de datos existe y si no existe la creamos.
* Ejecutamos las migraciones pendientes para poder usar la aplicacion.
* @TODO: EN CASO DE LA QUE CONEXION A POSTGRES FALLE SE DEBERA INGRESAR MANUAL AL MOTOR DE POSTGRESQL Y EJECUTAR
* CREATE DATABASE posts;
* y Luego correr las migraciones por separado con el comando run migration
*/

const initDatabase = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres'
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}'`);

    if (res.rowCount === 0) {
      console.log(`Creando base de datos ${process.env.DB_DATABASE}...`);
      await client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
      console.log('Base de datos creada con éxito');
    } else {
      console.log(`La base de datos ${process.env.DB_DATABASE} ya existe`);
    }

    console.log('Ejecutando migraciones...');
    const { stdout, stderr } = await execPromise('npm run migration:run');

    if (stderr) {
      console.error(`Error de migraciones: ${stderr}`);
    }

    console.log(`Migraciones ejecutadas: ${stdout}`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

initDatabase();