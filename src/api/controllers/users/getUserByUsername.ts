import { NextFunction, Request, Response } from "express";

import * as usersModel from "../../../models/users";

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await usersModel.getUserByUsername(username);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get user by username
 *     tags: [Users]
 *     description: Retrieve a user with the corresponding username.
 *     parameters:
 *       - name: username
 *         in: path
 *         description: username to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Responds with a user with the corresponding username
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
