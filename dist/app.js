"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.use(post_routes_1.default);
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
exports.default = app;
