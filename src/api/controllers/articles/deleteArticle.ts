import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";

import { ValidationError } from "../../../middleware/error-handling";

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    await articlesModel.deleteArticle(articleId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles/{article_id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     description: Delete an article with the corresponding id.
 *     parameters:
 *       - name: article_id
 *         in: path
 *         description: ID of article to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       204:
 *         description: Deletes an article with the corresponding id
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
