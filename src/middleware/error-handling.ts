import { NextFunction, Request, Response } from "express";
import {
  ValidationError as SequelizeValidationError,
  DatabaseError as DatabaseError,
  UniqueConstraintError,
} from "sequelize";

export class HttpError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class ValidationError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.status = 400; // HTTP status code for Bad Request

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class PostgresError extends Error {
  public status: number;
  public code: string;

  constructor(message: string, code: string, status: number = 500) {
    super(message);
    this.name = "PostgresError";
    this.code = code;
    this.status = status;

    Object.setPrototypeOf(this, PostgresError.prototype);
  }
}

export const errorHandling = (
  err: HttpError | ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DatabaseError && "code" in err.original) {
    // Handle PostgreSQL-specific errors

    if (
      err.original.code === "23502" ||
      err.original.code === "22P02" ||
      err.original.code === "42703"
    ) {
      err = new ValidationError("Bad request");
    } else if (err.original.code === "23503") {
      err = new HttpError(404, "No key found");
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      return;
    }
  } else if (err instanceof SequelizeValidationError) {
    err = new ValidationError("Bad request");
  }

  // Handle generic application errors
  res
    .status(err.status || 500)
    .send({ message: err.message || "Internal Server Error" });
};
