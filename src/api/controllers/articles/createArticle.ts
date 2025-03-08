import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newArticle = await articlesModel.createArticle(body);
    res.status(201).send({ newArticle });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Post article
 *     tags: [Articles]
 *     description: Post an article.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Protect amur tigers"
 *                 description: "The title of the article"
 *               topic:
 *                 type: string
 *                 example: "cats"
 *                 description: "The topic or category of the article"
 *               author:
 *                 type: string
 *                 example: "lurker"
 *                 description: "The author of the article"
 *               body:
 *                 type: string
 *                 example: "Siberian tigers are the most rare subspecies of tiger and the largest tiger subspecies in the world."
 *               article_img_url:
 *                 type: string
 *                 example: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
 *                 description: "The URL of the article's image"
 *
 *     responses:
 *       201:
 *         description: Responds with a newly created article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
