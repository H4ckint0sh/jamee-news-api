import { User } from "../../db/data/types";
import * as models from "../../db/models";
import { HttpError } from "../../middleware/error-handling";
import bcrypt from 'bcryptjs';

export const createUser = async (user: User): Promise<User> => {

	user.password = await bcrypt.hash(user.password, 8);
	const createdUser = await models.User.create(user);

	if (!createdUser) {
		throw new HttpError(500, "Failed to create user");
	}

	return createdUser;
};
