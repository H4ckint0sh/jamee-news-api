import * as models from "../../db/models";

import { HttpError } from "../../middleware/error-handling";

export const deleteComment = async (comment_id: number) => {
  const rowCount = await models.Comment.destroy({
    where: { comment_id: comment_id },
  });

  if (!rowCount) {
    throw new HttpError(404, "No data found");
  }
};
