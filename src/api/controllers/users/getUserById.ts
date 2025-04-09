import { NextFunction, Request, Response } from 'express';

import * as usersModel from '../../../models/users';
import { ValidationError } from '../../../middleware/error-handling';

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = Number(req.params.user_id);
        if (isNaN(userId)) {
            throw new ValidationError('Invalid userId id provided');
        }
        const user = await usersModel.getUserById(userId);
        res.status(200).send({ user });
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
