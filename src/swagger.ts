import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";

const router = Router();

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NC NEWS API Documentation",
      version: "1.0.0",
      description: "API documentation generated with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
      {
        url: "https://ts-be-nc-news-jsmapzdgsq-nw.a.run.app",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/api/controllers/**/*.ts"], // Path to the API routes/controllers
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
