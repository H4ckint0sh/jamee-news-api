import express, { Application } from "express";
import cors from "cors";

import routes from "./api/routes";
import swaggerRouter from "./swagger";

import { errorHandling } from "./middleware/error-handling";

const app: Application = express();

// * Swagger
app.use(swaggerRouter);

// * Tech endpoints
app.use(cors());
app.use(express.json());

// * Routes
app.use("/api", routes);

// * Custom Error Handler
app.use(errorHandling);

export default app;
