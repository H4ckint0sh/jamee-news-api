import { User } from "../../db/data/types";
import * as models from "../../db/models";
import { HttpError } from "../../middleware/error-handling";
import bcrypt from 'bcryptjs';

export const updateUser = async (userId: number, updatedUserData: User): Promise<User> => {

	const user = await models.User.findOne({
		where: { user_id: userId },
	});

	if (!user) {
		throw new HttpError(404, "No data found");
	}

	if (updatedUserData.password) {
		user.password = await bcrypt.hash(updatedUserData.password, 8);
	}

	user.userName = updatedUserData.userName ?? user.userName;
	user.roleId = updatedUserData.roleId ?? user.roleId;
	user.name = updatedUserData.name ?? user.name;
	user.avatar_url = updatedUserData.avatar_url ?? user.avatar_url;

	await user.save();

	return user;
};
