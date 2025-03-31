import { Role } from "../../db/data/types";
import * as models from "../../db/models";
import { HttpError } from "../../middleware/error-handling";

export const updateRole = async (id: number, updatedRoleData: Role): Promise<Role> => {
	const role = await models.Role.findByPk(id);
	if (!role) {
		throw new HttpError(404, 'Role not found');
	}

	const createdRole = await role.update(updatedRoleData); // Actualiza el rol existente
	if (!createdRole) {
		throw new HttpError(500, `Error updating role`);
	}

	return createdRole;
};
