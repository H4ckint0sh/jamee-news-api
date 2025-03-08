import * as models from "../../db/models";

import { Topic } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const createTopic = async (newTopicBody: Topic): Promise<Topic> => {
  const { slug, description = "" } = newTopicBody;

  if (!slug) {
    throw new HttpError(400, "Bad request");
  }

  const topic = await models.Topic.create({
    slug: slug,
    description: description,
  });

  return topic;
};
