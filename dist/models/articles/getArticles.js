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
exports.getArticles = void 0;
const sequelize_1 = require("sequelize");
const models = __importStar(require("../../db/models"));
const error_handling_1 = require("../../middleware/error-handling");
const getArticles = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    let { sort_by, order, topic, limit, p } = queries;
    // Validation
    sort_by = sort_by === "null" ? undefined : sort_by;
    order = order === "null" ? undefined : order;
    topic = topic === "null" ? undefined : topic;
    sort_by = sort_by || "created_at";
    order = order || "desc";
    limit = limit || 10;
    p = p || 1;
    const acceptedQueries = ["asc", "desc"];
    const acceptedSortQueries = [
        "author",
        "created_at",
        "title",
        "topic",
        "votes",
        "comment_count",
    ];
    if (!acceptedSortQueries.includes(sort_by) ||
        !acceptedQueries.includes(order)) {
        throw new error_handling_1.ValidationError("Bad query value!");
    }
    // Convert to numbers to ensure proper calculation
    const numLimit = Number(limit);
    const numP = Number(p);
    const offset = numLimit * (numP - 1);
    const articles = yield models.Article.findAll({
        attributes: [
            "article_id",
            "author",
            [sequelize_1.Sequelize.col("user.avatar_url"), "author_avatar_url"],
            "title",
            "body",
            "topic",
            "created_at",
            "votes",
            "article_img_url",
            [
                sequelize_1.Sequelize.cast(sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("comments")), "integer"),
                "comment_count",
            ],
        ],
        include: [
            {
                model: models.Comment,
                attributes: [],
                required: false, // Make this optional to include articles with no comments
            },
            {
                model: models.User,
                attributes: [],
                required: true,
            },
        ],
        where: topic ? { topic } : {},
        group: ["articles.article_id", "user.userName", "user.avatar_url"],
        order: [[sort_by === "comment_count" ? sequelize_1.Sequelize.literal("comment_count") : sort_by, order]],
        subQuery: false,
        limit: numLimit,
        offset,
    });
    return articles;
});
exports.getArticles = getArticles;
