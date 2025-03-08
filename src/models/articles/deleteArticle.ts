import * as models from "../../db/models";

import { HttpError } from "../../middleware/error-handling";

export const deleteArticle = async (articleId: number) => {
  const rowCount = await models.Article.destroy({
    where: { article_id: articleId },
  });
  if (!rowCount) {
    throw new HttpError(404, "No data found");
  }
};
