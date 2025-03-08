import * as models from "../../db/models";

import { Article } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const updateArticle = async (
  articleId: number,
  inc_vote: string
): Promise<Article> => {
  const article = await models.Article.findOne({
    where: { article_id: articleId },
  });

  if (!article) {
    throw new HttpError(404, "No data found");
  }

  article.votes = article.votes + inc_vote;

  await article.save();

  return article;
};
