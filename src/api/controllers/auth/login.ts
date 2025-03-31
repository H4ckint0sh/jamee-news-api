import { NextFunction, Request, Response, raw } from "express";
import bcrypt from 'bcryptjs';
import * as models from "../../../db/models";
import { ValidationError } from "../../../middleware/error-handling";
import { generateToken } from "../../../utils";

import { UserQuery } from "../types";
export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userName, password } = req.body;
		const user = await models.User.findOne({
			attributes: [
				"user_id",
				"password",
			],
			where: { userName: userName },
			raw: true
		})

		if (!user) {
			throw new ValidationError('User not found.');
		}

		const passwordIsValid = bcrypt.compareSync(password, user?.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, token: null });
			throw new ValidationError('Invalid password.');
		}

		const token = generateToken(user);
		res.status(200).send({ auth: true, token });
	} catch (error) {
		next(error);
	}
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
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
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *     security: []  # This route does not require bearer authentication
 */
