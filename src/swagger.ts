import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '📘 Posts API',
      version: '1.0.0',
      description: 'API para gestión de posts personalizados',
    },
  },
  apis: ["./controllers/posts.controllers.ts",'./src/routes/post.routes.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
