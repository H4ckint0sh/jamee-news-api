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
exports.updateComment = void 0;
const commentsModel = __importStar(require("../../../models/comments"));
const error_handling_1 = require("../../../middleware/error-handling");
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = Number(req.params.comment_id);
        const incVote = req.body.inc_vote;
        if (isNaN(commentId) || isNaN(incVote)) {
            throw new error_handling_1.ValidationError("Bad request");
        }
        const updatedComment = yield commentsModel.updateComment(commentId, incVote);
        res.status(200).send({ updatedComment });
    }
    catch (error) {
        next(error);
    }
});
exports.updateComment = updateComment;
/**
 * @swagger
 * /api/comments/{comment_id}:
 *   patch:
 *     summary: Update a comment's votes on an article
 *     tags: [Comments]
 *     description: Update a comment on an article
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         description: ID of corresponding comment
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inc_vote:
 *                 type: integer
 *                 description: The number of votes the comment has to be updated
 *     responses:
 *       201:
 *         description: Responds with a newly created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
