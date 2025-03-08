import * as models from "../../db/models";
import { Comment } from "../../db/data/types";

import { HttpError } from "../../middleware/error-handling";

export const updateComment = async (
  id: number,
  inc_vote: number
): Promise<Comment> => {
  const comment = await models.Comment.findOne({
    where: { comment_id: id },
    attributes: [
      "comment_id",
      "body",
      "article_id",
      "author",
      "votes",
      "created_at",
    ],
  });

  if (!comment) {
    throw new HttpError(404, "No data found");
  }

  comment.votes = comment.votes + inc_vote;

  await comment.save();

  return comment;
};
