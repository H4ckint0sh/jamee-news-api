import { NextFunction, Request, Response } from "express";
import * as roleModel from "../../../models/roles";
import { ValidationError } from "../../../middleware/error-handling";

export const deleteRole
	= async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const roleId = Number(req.params.role_id);
			if (isNaN(roleId)) {
				throw new ValidationError("Invalid article id provided");
			}
			await roleModel.deleteRole(roleId);
			res.status(204).send();
		} catch (error) {
			next(error);
		}
	};

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
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
 *         description: The ID of the role to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */
