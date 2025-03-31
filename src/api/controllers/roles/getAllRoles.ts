import { NextFunction, Request, Response } from "express";
import * as rolesModel from "../../../models/roles";

export const getAllRoles = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const roles = await rolesModel.getAllRoles();
		res.status(200).json(roles);
	} catch (error) {
		next(error);
	}
};

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Retrieve a list of all roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
