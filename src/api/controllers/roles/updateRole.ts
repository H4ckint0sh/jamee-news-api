import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import * as usersModel from "../../../models/users";
import * as roleModel from "../../../models/roles";
import { ValidationError } from "../../../middleware/error-handling";

export const updateRole
	= async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = parseInt(req.params.id);
			if (isNaN(id)) {
				throw new ValidationError('Invalid role id');
			}
			const { name, status } = req.body;
			if (!name || typeof status !== 'boolean') {
				throw new ValidationError('Invalid role data');
			}

			// Check if the role name already exists and is not the name of the role being updated
			const existingRole = await roleModel.getAllRoles().then(roles =>
				roles.find(role => role.name === name && role.role_id !== id)
			);
			if (existingRole) {
				throw new ValidationError('Role name already exists');
			}

			const updatedRole = await roleModel.updateRole(id, req.body);
			if (!updatedRole) {
				throw new ValidationError('Role not found');
			}
			res.status(200).send({ role: updatedRole });

		} catch (error) {
			next(error);
		}
	};

/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     summary: Update a role by ID
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
 *         description: The ID of the role to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           example:
 *             name: "Updated Role"
 *             status: false
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */
