import * as models from "../../db/models";

import { HttpError } from "../../middleware/error-handling";

export const deleteUser = async (userId: number) => {
	const rowCount = await models.Article.destroy({
		where: { user_id: userId },
	});
	if (!rowCount) {
		throw new HttpError(404, "No data found");
	}
};
