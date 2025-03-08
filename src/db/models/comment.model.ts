import { Sequelize, DataTypes } from "sequelize";
import db from "../connection";
import * as models from "../models";

const Comment = db.define(
  "comments",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

Comment.belongsTo(models.Article, {
  foreignKey: "article_id",
  onDelete: "CASCADE",
});

models.Article.hasMany(Comment, { foreignKey: "article_id" });
Comment.belongsTo(models.User, { foreignKey: "author", targetKey: "username" });

export { Comment };
