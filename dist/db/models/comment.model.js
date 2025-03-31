"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const models = __importStar(require("../models"));
const Comment = connection_1.default.define("comments", {
    comment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    body: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    },
    article_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    votes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
exports.Comment = Comment;
Comment.belongsTo(models.Article, {
    foreignKey: "article_id",
    onDelete: "CASCADE",
});
models.Article.hasMany(Comment, { foreignKey: "article_id" });
Comment.belongsTo(models.User, { foreignKey: "author", targetKey: "userName" });
