import * as models from "../../db/models";

import { Comment } from "../../db/data/types";

import { HttpError, ValidationError } from "../../middleware/error-handling";

export const createComment = async (
  articleId: number,
  reqBody: { username: string; body: string }
): Promise<Comment> => {
  const { username, body } = reqBody;

  if (typeof body !== "string" || typeof username !== "string") {
    throw new ValidationError("Bad request");
  }

  const article = await models.Article.findOne({
    where: { article_id: articleId },
  });

  if (!article) {
    throw new HttpError(404, "No key found");
  }

  const newComment = await models.Comment.create({
    author: username,
    body: body,
    article_id: articleId,
  });

  return newComment;
};
