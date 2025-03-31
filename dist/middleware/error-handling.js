"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = exports.PostgresError = exports.ValidationError = exports.HttpError = void 0;
const sequelize_1 = require("sequelize");
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
exports.HttpError = HttpError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.status = 400; // HTTP status code for Bad Request
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class PostgresError extends Error {
    constructor(message, code, status = 500) {
        super(message);
        this.name = "PostgresError";
        this.code = code;
        this.status = status;
        Object.setPrototypeOf(this, PostgresError.prototype);
    }
}
exports.PostgresError = PostgresError;
const errorHandling = (err, req, res, next) => {
    if (err instanceof sequelize_1.DatabaseError && "code" in err.original) {
        // Handle PostgreSQL-specific errors
        if (err.original.code === "23502" ||
            err.original.code === "22P02" ||
            err.original.code === "42703") {
            err = new ValidationError("Bad request");
        }
        else if (err.original.code === "23503") {
            err = new HttpError(404, "No key found");
        }
        else {
            res.status(500).send({ message: "Internal Server Error" });
            return;
        }
    }
    else if (err instanceof sequelize_1.ValidationError) {
        err = new ValidationError("Bad request");
    }
    // Handle generic application errors
    res
        .status(err.status || 500)
        .send({ message: err.message || "Internal Server Error" });
};
exports.errorHandling = errorHandling;
