import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import postRoutes from "./routes/post.routes"
import { setupSwagger } from './swagger';

const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
setupSwagger(app);
app.use(postRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de Posts',
        documentation: 'Visita /api-docs para ver la documentación de la API',
        version: '1.0.0'
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe en esta API`,
        availableEndpoints: '/api-docs'
    });
});

export default app;

