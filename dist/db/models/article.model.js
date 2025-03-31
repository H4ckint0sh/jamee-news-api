"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const _1 = require("./");
const Article = connection_1.default.define("articles", {
    article_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    topic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    votes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    article_img_url: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
exports.Article = Article;
Article.belongsTo(_1.User, {
    foreignKey: "author",
    targetKey: "userName",
    onDelete: "CASCADE",
});
Article.belongsTo(_1.Topic, {
    foreignKey: "topic",
    targetKey: "slug",
});
