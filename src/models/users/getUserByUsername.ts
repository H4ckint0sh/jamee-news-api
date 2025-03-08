import { User } from "../../db/data/types";
import * as models from "../../db/models";

import { HttpError } from "../../middleware/error-handling";

export const getUserByUsername = async (username: string): Promise<User> => {
  const user = await models.User.findOne({
    attributes: ["username", "name", "avatar_url"],
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new HttpError(404, "No data found");
  }
  return user;
};
