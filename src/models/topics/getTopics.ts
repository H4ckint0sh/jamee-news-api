import * as models from "../../db/models";

import { Topic } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const getTopics = async (): Promise<Topic[]> => {
  const topics = await models.Topic.findAll({
    attributes: ["slug", "description"],
  });

  if (!topics.length) {
    throw new HttpError(404, "No data found");
  }

  return topics;
};
