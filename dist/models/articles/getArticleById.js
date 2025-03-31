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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleById = void 0;
const sequelize_1 = require("sequelize");
const models = __importStar(require("../../db/models"));
const error_handling_1 = require("../../middleware/error-handling");
const getArticleById = (articleId) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield models.Article.findOne({
        attributes: [
            "article_id",
            "topic",
            "author",
            [sequelize_1.Sequelize.col("user.avatar_url"), "author_avatar_url"],
            "title",
            "body",
            "votes",
            "article_img_url",
            "created_at",
            [
                sequelize_1.Sequelize.cast(sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("comments")), "integer"),
                "comment_count",
            ],
        ],
        include: [
            {
                model: models.Comment,
                attributes: [],
            },
            {
                model: models.User,
                attributes: [],
                required: true,
            },
        ],
        where: { article_id: articleId },
        group: ["articles.article_id", "user.userName", "user.avatar_url"],
    });
    if (!article) {
        throw new error_handling_1.HttpError(404, "No data found");
    }
    return article;
});
exports.getArticleById = getArticleById;
