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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const articlesController = __importStar(require("../controllers/articles"));
const commentsController = __importStar(require("../controllers/comments"));
const topicsController = __importStar(require("../controllers/topics"));
const usersController = __importStar(require("../controllers/users"));
const rolesController = __importStar(require("../controllers/roles"));
const authController = __importStar(require("../controllers/auth"));
// * Articles
router.get("/articles", articlesController.getArticles);
router.get("/articles/:article_id", articlesController.getArticleById);
router.patch("/articles/:article_id", articlesController.updateArticle);
router.post("/articles/", articlesController.createArticle);
router.delete("/articles/:article_id", articlesController.deleteArticle);
// * Comments
router.get("/articles/:article_id/comments", commentsController.getCommentsByArticleId);
router.post("/articles/:article_id/comments", commentsController.createComment);
router.delete("/comments/:comment_id", commentsController.deleteComment);
router.patch("/comments/:comment_id", commentsController.updateComment);
// * Topics
router.get("/topics", topicsController.getTopics);
router.post("/topics", topicsController.createTopic);
// * Users
router.get("/users", usersController.getAllUsers);
router.get("/users/:user_id", usersController.getUserById);
router.post("/users", usersController.createUser);
router.patch("/users/:user_id", usersController.updateUser);
router.delete("/users/:user_id", usersController.deleteUser);
// Roles
router.get("/roles", rolesController.getAllRoles);
router.get("/roles/:role_id", rolesController.getRoleById);
router.post("/roles", rolesController.createRole);
router.patch("/roles/:role_id", rolesController.updateRole);
router.delete("/roles/:role_id", rolesController.deleteRole);
// Auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
exports.default = router;
