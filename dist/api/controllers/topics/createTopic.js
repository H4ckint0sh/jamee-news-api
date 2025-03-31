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
exports.createTopic = void 0;
const topicsModel = __importStar(require("../../../models/topics"));
const createTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTopicBody = req.body;
        const newTopic = yield topicsModel.createTopic(newTopicBody);
        res.status(201).send({ newTopic });
    }
    catch (error) {
        next(error);
    }
});
exports.createTopic = createTopic;
/**
 * @swagger
 * /api/topics:
 *   post:
 *     summary: Post a topic
 *     tags: [Topics]
 *     description: Post a topic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *                 example: "Protect amur tigers"
 *                 description: The uniq name of the topic
 *               description:
 *                 type: string
 *                 example: "Cats don't like to be wet"
 *                 description: Description of the topic.
 *     responses:
 *       201:
 *         description: Responds with a newly created topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
