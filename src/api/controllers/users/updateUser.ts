import { RequestHandler } from 'express';
import { User } from '../../../db/data/types';
import { ValidationError } from '../../../middleware/error-handling';
import * as roleModel from '../../../models/roles';
import * as usersModel from '../../../models/users';
import { UserQuery } from '../types';

type Params = { user_id: string };
type ResBody = {};

export const updateUser: RequestHandler<
    Params,
    ResBody,
    User,
    UserQuery
> = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.user_id);
        const allQueries = req.query;
        if (isNaN(userId)) {
            throw new ValidationError('Invalid user id provided');
        }
        const { userName, password, roleId, name, avatar_url } = req.body;
        if (!userName || !password || !roleId || !name || !avatar_url) {
            throw new ValidationError('Invalid user data provided');
        }
        const existingUser = await usersModel
            .getAllUsers(allQueries)
            .then((users) => users.find((user) => user.userName === userName));
        if (existingUser) {
            throw new ValidationError('Username already exists');
        }
        const role = await roleModel.getRoleById(roleId);
        if (!role) {
            throw new ValidationError('Role not found');
        }
        const updatedUser = await usersModel.updateUser(userId, req.body);
        if (!updatedUser) {
            throw new ValidationError('User not found');
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             userName: "newuser"
 *             password: "password123"
 *             roleId: 2
 *             name: "John Doe"
 *             avatar_url: "https://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input
 */
