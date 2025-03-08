import { NextFunction, Request, Response } from "express";

import * as commentsModel from "../../../models/comments";
import { ValidationError } from "../../../middleware/error-handling";

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment_id: number = Number(req.params.comment_id);
    if (isNaN(comment_id)) {
      throw new ValidationError("Bad request");
    }
    await commentsModel.deleteComment(comment_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/comments/{comment_id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     description: Delete a comment with the corresponding id.
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         description: ID of a comment to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deletes a comment with the corresponding id
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
