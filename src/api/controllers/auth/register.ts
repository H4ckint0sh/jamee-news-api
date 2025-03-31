import { NextFunction, Request, Response } from "express";
import * as usersModel from "../../../models/users";
import * as roleModel from "../../../models/roles";
import { User } from "../../../db/data/types";
import { UserQuery } from "../types";
import { ValidationError } from "../../../middleware/error-handling";
import { generateToken } from "../../../utils";

export const register = async (
	req: Request<{ id: string }, {}, User, UserQuery>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userName, password, roleId } = req.body;
		const allQueries = req.query;

		if (!userName || !password || !roleId) {
			throw new ValidationError('Username, password, and role ID are required.');
		}

		// Validación de existencia del rol
		const role = await roleModel.getRoleById(roleId);
		if (!role) {
			throw new ValidationError('Role not found.');
		}

		// Verificación de que el nombre de usuario no esté repetido
		const existingUsers = await usersModel.getAllUsers(allQueries);
		const existingUser = existingUsers.find(user => user.userName === userName);
		if (existingUser) {
			throw new ValidationError('Username already exists.');
		}

		const newUser = await usersModel.createUser(req.body);

		const token = generateToken(newUser);
		res.status(201).send({ auth: true, token });
	} catch (error) {
		next(error);
	}
};


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user registration and login.
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's userName
 *               password:
 *                 type: string
 *                 description: The user's password
 *               roleId:
 *                 type: integer
 *                 description: The ID of the role assigned to the user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing userName, password, or role ID
 *       404:
 *         description: Role not found
 *     security: []  # This route does not require bearer authentication
 */
