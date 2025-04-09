import { NextFunction, Request, Response } from 'express';
import * as usersModel from '../../../models/users';
import { UserQuery } from '../types';

export const getAllUsers = async (
    req: Request<{}, {}, {}, UserQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const allQueries = req.query;
        const users = await usersModel.getAllUsers(allQueries);
        res.status(200).send({ users });
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Responds with an array of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
