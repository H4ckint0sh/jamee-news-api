import { NextFunction, Request, Response } from "express";

import * as topicsModel from "../../../models/topics";

import { Topic } from "../../../db/data/types";

export const createTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTopicBody: Topic = req.body;
    const newTopic = await topicsModel.createTopic(newTopicBody);
    res.status(201).send({ newTopic });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/topics:
 *   post:
 *     summary: Post a topic
 *     tags: [Topics]
 *     description: Post a topic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *                 example: "Protect amur tigers"
 *                 description: The uniq name of the topic
 *               description:
 *                 type: string
 *                 example: "Cats don't like to be wet"
 *                 description: Description of the topic.
 *     responses:
 *       201:
 *         description: Responds with a newly created topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
