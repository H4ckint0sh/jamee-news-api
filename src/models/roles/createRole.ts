import { Role } from "../../db/data/types";
import * as models from "../../db/models";
import { HttpError } from "../../middleware/error-handling";

export const createRole = async (roleData: Role): Promise<Role> => {
	const createdRole = await models.Role.create(roleData);

	if (!createdRole) {
		throw new HttpError(500, `Error creating role`);
	}

	return createdRole;
};
