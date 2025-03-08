import * as models from "../../db/models";
import { Article } from "../../db/data/types";

export const createArticle = async (articleBody: {
  title: string;
  topic: string;
  author: string;
  body: string;
  article_img_url: string;
}): Promise<Article> => {
  const defaultArticleUrl =
    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700";

  const {
    title,
    topic,
    author,
    body,
    article_img_url = defaultArticleUrl,
  } = articleBody;

  const newArticle = await models.Article.create({
    title: title,
    topic: topic,
    author: author,
    body: body,
    article_img_url: article_img_url,
  });
  return newArticle;
};
