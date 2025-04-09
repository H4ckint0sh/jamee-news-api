import * as dotenv from "dotenv";
dotenv.config(); // Make sure this is at the very top

import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../db/data/types";
import { HttpError } from "./error-handling";

//TODO: Get rid of your_secret_key
const SECRET_KEY = process.env.SECRET_KEY; // Provide a default

interface AuthenticatedRequest extends Request {
  user?: User;
}

export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers["authorization"];
  if (!token) {
    throw new HttpError(401, "Authentication required");
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    throw new HttpError(401, "IInvalid token format.nvalid token format.");
  }

  jwt.verify(tokenParts[1], SECRET_KEY!, (err, decoded) => {
    if (err || !decoded) {
      res.status(500).json({ message: "Failed to authenticate token." });
      return;
    }

    req.user = decoded as User;
    next();
  });
}
