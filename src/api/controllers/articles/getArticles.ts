import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";

import { ArticleQuery } from "../types";

export const getArticles = async (
  req: Request<{}, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const allQueries = req.query;
    const articles = await articlesModel.getArticles(allQueries);

    res.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     description: Retrieve a list of all articles.
 *     parameters:
 *       - name: sort_by
 *         in: query
 *         description: "Field to sort articles by (default: created_at)."
 *         schema:
 *           type: string
 *           enum: [author, created_at, title, topic, votes, comment_count]
 *       - name: order
 *         in: query
 *         description: "Sort order (asc or desc, default: desc)."
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - name: topic
 *         in: query
 *         description: "Filter articles by topic."
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: "Maximum number of articles to return per page (default: 10)."
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - name: p
 *         in: query
 *         description: "Page number (default: 1)."
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Responds with an array of all articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
