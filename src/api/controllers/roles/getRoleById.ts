import { NextFunction, Request, Response } from "express";
import * as rolesModel from "../../../models/roles";
import { ValidationError } from "../../../middleware/error-handling";

export const getRoleById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);
		if (isNaN(id)) {
			throw new ValidationError('Invalid role ID');
		}
		const role = await rolesModel.getRoleById(id);
		if (!role) {
			throw new ValidationError('Role not found');
		}
		res.status(200).json(role);
	} catch (error) {
		next(error);
	}
};

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Retrieve a single role by ID
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the role to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: A single role object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */
