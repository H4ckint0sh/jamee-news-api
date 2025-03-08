import { Sequelize } from "sequelize";
import * as models from "../../db/models";

import { Article } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const getArticleById = async (articleId: number): Promise<Article> => {
  const article = await models.Article.findOne({
    attributes: [
      "article_id",
      "topic",
      "author",
      [Sequelize.col("user.avatar_url"), "author_avatar_url"],
      "title",
      "body",
      "votes",
      "article_img_url",
      "created_at",
      [
        Sequelize.cast(
          Sequelize.fn("COUNT", Sequelize.col("comments")),
          "integer"
        ),
        "comment_count",
      ],
    ],
    include: [
      {
        model: models.Comment,
        attributes: [],
      },
      {
        model: models.User,
        attributes: [],
        required: true,
      },
    ],
    where: { article_id: articleId },
    group: ["articles.article_id", "user.username"],
  });

  if (!article) {
    throw new HttpError(404, "No data found");
  }

  return article;
};
