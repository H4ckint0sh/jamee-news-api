import { DataTypes } from "sequelize";
import db from "../connection";

export const Topic = db.define("Topic", {
  slug: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
