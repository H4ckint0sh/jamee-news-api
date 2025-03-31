import { Role } from "../../db/data/types";
import * as models from "../../db/models";
import { HttpError } from "../../middleware/error-handling";

export const getRoleById = async (id: number): Promise<Role> => {
	const role = await models.Role.findByPk(id);

	if (!role) {
		throw new HttpError(500, `Error fetching role with ID ${id}`);
	}

	return role;
};
