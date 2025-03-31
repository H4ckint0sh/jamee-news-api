import * as models from "../../db/models";
import { User } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const getUserById = async (userId: number): Promise<User> => {
	const user = await models.User.findOne({
		attributes: [
			"user_id",
			"name",
			"userName",
			"roleId",
		],
		where: { user_id: userId },
		// group: ["articles.article_id", "user.userName", "user.avatar_url"],
	});

	if (!user) {
		throw new HttpError(404, "No data found");
	}

	return user;
};
