import { NextFunction, Request, Response } from "express";

import * as topicsModel from "../../../models/topics";

export const getTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topics = await topicsModel.getTopics();
    res.status(200).send({ topics });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topics]
 *     description: Retrieve a list of all topics.
 *     responses:
 *       200:
 *         description: Responds with an array of all topics.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */
