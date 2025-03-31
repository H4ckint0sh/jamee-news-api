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
const articlesModel = __importStar(require("../../../models/articles"));
const getArticles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allQueries = req.query;
        const articles = yield articlesModel.getArticles(allQueries);
        res.status(200).send({ articles });
    }
    catch (error) {
        next(error);
    }
});
exports.getArticles = getArticles;
/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     description: Retrieve a list of all articles.
 *     parameters:
 *       - name: sort_by
 *         in: query
 *         description: "Field to sort articles by (default: created_at)."
 *         schema:
 *           type: string
 *           enum: [author, created_at, title, topic, votes, comment_count]
 *       - name: order
 *         in: query
 *         description: "Sort order (asc or desc, default: desc)."
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - name: topic
 *         in: query
 *         description: "Filter articles by topic."
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: "Maximum number of articles to return per page (default: 10)."
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - name: p
 *         in: query
 *         description: "Page number (default: 1)."
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Responds with an array of all articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
