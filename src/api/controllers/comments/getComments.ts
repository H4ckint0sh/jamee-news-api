import { NextFunction, Request, Response } from "express";

import { ArticleQuery } from "../types";

import * as commentsModel from "../../../models/comments";
import { ValidationError } from "../../../middleware/error-handling";

export const getCommentsByArticleId = async (
  req: Request<{ article_id: string }, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const queries = req.query;
    const comments = await commentsModel.getCommentsByArticleId(
      articleId,
      queries
    );
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles/{article_id}/comments:
 *   get:
 *     summary: Get comments by article_id
 *     tags: [Comments]
 *     description: Retrieve comments of the corresponding article id.
 *     parameters:
 *       - name: article_id
 *         in: path
 *         description: ID of corresponding article
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responds with an array of comments with the corresponding article id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
