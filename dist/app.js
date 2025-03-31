"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes"));
const swagger_1 = __importDefault(require("./swagger"));
const error_handling_1 = require("./middleware/error-handling");
const app = (0, express_1.default)();
// * Swagger
app.use(swagger_1.default);
// * Tech endpoints
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// * Routes
app.use("/api", routes_1.default);
// * Custom Error Handler
app.use(error_handling_1.errorHandling);
exports.default = app;
