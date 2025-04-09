import { NextFunction, Request, Response } from 'express';
import * as rolesModel from '../../../models/roles';
import { ValidationError } from '../../../middleware/error-handling';

export const createRole = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, status } = req.body;
        if (!name || typeof status !== 'boolean') {
            throw new ValidationError('Invalid role data');
        }
        // Check if the role name already exists
        const existingRole = await rolesModel
            .getAllRoles()
            .then((roles) => roles.find((role) => role.name === name));
        if (existingRole) {
            throw new ValidationError('Role name already exists');
        }

        const newRole = await rolesModel.createRole(req.body);
        res.status(201).send({ newRole });
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           example:
 *             name: "Admin"
 *             status: true
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request, invalid input
 */
