import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import * as articlesController from "../controllers/articles";
import * as commentsController from "../controllers/comments";
import * as topicsController from "../controllers/topics";
import * as usersController from "../controllers/users";

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
router.get("/users", usersController.getUsers);
router.get("/users/:username", usersController.getUserByUsername);

export default router;
