"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User = connection_1.default.define("users", {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(value, salt);
            // @ts-ignore: Using TypeScript ignore to bypass type checking for now
            this.setDataValue("password", hashedPassword);
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'role_id'
        }
    }, avatar_url: {
        type: sequelize_1.DataTypes.STRING,
        field: "avatar_url",
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        field: "created_at",
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        field: "updated_at",
    }
}, {
    timestamps: true,
    freezeTableName: true
});
exports.User = User;
