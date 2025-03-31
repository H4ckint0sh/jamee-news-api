import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import * as articlesController from "../controllers/articles";
import * as commentsController from "../controllers/comments";
import * as topicsController from "../controllers/topics";
import * as usersController from "../controllers/users";
import * as rolesController from "../controllers/roles";
import * as authController from "../controllers/auth";


// * Articles
router.get("/articles", articlesController.getArticles);
router.get("/articles/:article_id", articlesController.getArticleById);
router.patch("/articles/:article_id", articlesController.updateArticle);
router.post("/articles/", articlesController.createArticle);
router.delete("/articles/:article_id", articlesController.deleteArticle);

// * Comments
router.get(
	"/articles/:article_id/comments",
	commentsController.getCommentsByArticleId
);
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

export default router;
