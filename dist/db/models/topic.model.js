"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
exports.Topic = connection_1.default.define("Topic", {
    slug: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
