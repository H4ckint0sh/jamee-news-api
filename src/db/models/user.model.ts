import { DataTypes } from "sequelize";
import db from "../../db/connection";
import bcrypt from "bcryptjs";

const User = db.define(
	"users",
	{
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value: string) {
				const salt = bcrypt.genSaltSync(10);
				const hashedPassword = bcrypt.hashSync(value, salt);
				// @ts-ignore: Using TypeScript ignore to bypass type checking for now
				this.setDataValue("password", hashedPassword);
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		roleId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'roles',
				key: 'role_id'
			}
		}, avatar_url: {
			type: DataTypes.STRING,
			field: "avatar_url",
		},
		created_at: {
			type: DataTypes.DATE,
			field: "created_at",
		},
		updated_at: {
			type: DataTypes.DATE,
			field: "updated_at",
		}
	}, {
	timestamps: true,
	freezeTableName: true
});

// User.hasMany(models.Article, { foreignKey: "author", sourceKey: "userName" });
// User.hasMany(models.Comment, { foreignKey: "author", sourceKey: "userName" });

export { User };
