"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = require("express");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const router = (0, express_1.Router)();
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
router.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = router;
