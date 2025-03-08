import { Sequelize } from "sequelize";
import * as models from "../../db/models";

import { Article } from "../../db/data/types";

import { ArticleQuery } from "../../api/controllers/types";
import { ValidationError } from "../../middleware/error-handling";

export const getArticles = async (
  queries: ArticleQuery
): Promise<Article[]> => {
  let { sort_by, order, topic, limit, p } = queries;

  // Validation
  sort_by = sort_by === "null" ? undefined : sort_by;
  order = order === "null" ? undefined : order;
  topic = topic === "null" ? undefined : topic;

  sort_by = sort_by || "created_at";
  order = order || "desc";
  limit = limit || 10;
  p = p || 1;

  const acceptedQueries = ["asc", "desc"];
  const acceptedSortQueries = [
    "author",
    "created_at",
    "title",
    "topic",
    "votes",
    "comment_count",
  ];

  if (
    !acceptedSortQueries.includes(sort_by) ||
    !acceptedQueries.includes(order)
  ) {
    throw new ValidationError("Bad query value!");
  }

  const offset = +limit * +p - limit;

  const articles = await models.Article.findAll({
    attributes: [
      "article_id",
      "author",
      [Sequelize.col("user.avatar_url"), "author_avatar_url"],
      "title",
      "body",
      "topic",
      "created_at",
      "votes",
      "article_img_url",
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
    where: topic ? { topic } : {},
    group: ["articles.article_id", "user.username"],
    order: [[sort_by, order]],
    subQuery: false,
    limit,
    offset,
  });

  return articles;
};
