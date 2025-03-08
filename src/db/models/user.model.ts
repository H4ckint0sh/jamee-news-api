import { DataTypes } from "sequelize";
import db from "../../db/connection";
import * as models from "../models";

const User = db.define("users", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  avatar_url: {
    type: DataTypes.STRING,
    field: "avatar_url",
  },
});

// User.hasMany(models.Article, { foreignKey: "author", sourceKey: "username" });
// User.hasMany(models.Comment, { foreignKey: "author", sourceKey: "username" });

export { User };
