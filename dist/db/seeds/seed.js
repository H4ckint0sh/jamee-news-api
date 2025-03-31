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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const models = __importStar(require("../models"));
const utils_1 = require("./utils");
const seed = (_a) => __awaiter(void 0, [_a], void 0, function* ({ topicData, userData, articleData, commentData }) {
    try {
        yield connection_1.default.sync({ force: true });
        // Create topics
        yield models.Topic.bulkCreate(topicData);
        // Create users
        yield models.User.bulkCreate(userData);
        // Create articles
        const formattedArticleData = articleData.map(utils_1.convertTimestampToDate);
        const createdArticles = yield models.Article.bulkCreate(formattedArticleData, {
            returning: true,
        });
        // Create comments
        const articleIdLookup = (0, utils_1.createRef)(createdArticles, "title", "article_id");
        const formattedCommentData = (0, utils_1.formatComments)(commentData, articleIdLookup);
        yield models.Comment.bulkCreate(formattedCommentData);
        console.log("Database seeding completed.");
    }
    catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    }
});
exports.default = seed;
