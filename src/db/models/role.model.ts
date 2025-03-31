import { DataTypes } from "sequelize";
import db from "../connection";
import * as models from ".";

const Role = db.define(
	"roles",
	{
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},

	},
	{
		timestamps: true,
		freezeTableName: true,
	}
);

export { Role };
