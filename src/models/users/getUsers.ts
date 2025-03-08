import { User } from "../../db/data/types";
import * as models from "../../db/models";

export const getUsers = async (): Promise<User[]> => {
  const users = await models.User.findAll({
    attributes: ["username", "name", "avatar_url"],
  });

  return users;
};
