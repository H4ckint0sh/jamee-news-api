import { Sequelize } from "sequelize";

import * as models from "../../db/models";
import { Comment } from "../../db/data/types";

import { HttpError, ValidationError } from "../../middleware/error-handling";

export const getCommentsByArticleId = async (
  articleId: number,
  queries: { limit: number; p: number }
): Promise<Comment[]> => {
  const { limit = 10, p = 1 } = queries;

  if (isNaN(limit) || isNaN(p)) {
    throw new ValidationError("Bad query value!");
  }

  const offset = +limit * +p - 10;

  const article = await models.Article.findOne({
    where: { article_id: articleId },
  });

  if (!article) {
    throw new HttpError(404, "No data found");
  }

  const comments = await models.Comment.findAll({
    attributes: [
      "comment_id",
      "body",
      "article_id",
      "author",
      "votes",
      "created_at",
      [Sequelize.col("user.avatar_url"), "author_avatar_url"],
    ],
    where: {
      article_id: articleId,
    },
    include: [
      {
        model: models.User,
        attributes: [],
      },
    ],
    order: [["created_at", "DESC"]],
    limit: limit,
    offset: offset,
  });

  return comments;
};
