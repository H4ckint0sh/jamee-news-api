import { NextFunction, Request, Response } from "express";

import * as commentsModel from "../../../models/comments";
import { ValidationError } from "../../../middleware/error-handling";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const body = req.body;
    const newComment = await commentsModel.createComment(articleId, body);
    res.status(201).send({ newComment });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles/{article_id}/comments:
 *   post:
 *     summary: Post a comment on an article
 *     tags: [Comments]
 *     description: Post a comment on an article
 *     parameters:
 *       - name: article_id
 *         in: path
 *         description: ID of corresponding article
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "lurker"
 *                 description: "The username of the author of the comment"
 *               body:
 *                 type: string
 *                 example: "cats don't like dogs"
 *                 description: "The body of the comment"
 *     responses:
 *       201:
 *         description: Responds with a newly created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
