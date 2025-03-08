/**
 * @swagger
 * components:
 *   responses:
 *     404:
 *         description: No found error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the requested resource was not found.
 *     400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that invalid input is provided.
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         author:
 *           type: string
 *           description: The author of the article.
 *         body:
 *           type: string
 *           description: The content/body of the article.
 *         title:
 *           type: string
 *           description: The title of the article.
 *         article_id:
 *           type: integer
 *           description: The unique identifier of the article.
 *         topic:
 *           type: string
 *           description: The topic/category of the article.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp indicating when the article was created.
 *         votes:
 *           type: integer
 *           description: The number of votes the article has received.
 *         article_img_url:
 *           type: string
 *           description: The URL of the article's image.
 *         comment_count:
 *           type: integer
 *           description: The number of comments on the article.
 *     Comment:
 *       type: object
 *       properties:
 *         comment_id:
 *           type: integer
 *           description: The unique identifier of the comment.
 *         body:
 *           type: string
 *           description: The content of the comment.
 *         votes:
 *           type: integer
 *           description: The number of votes the comment has received.
 *         author:
 *           type: string
 *           description: The author of the comment.
 *         article_id:
 *           type: integer
 *           description: The ID of the article to which the comment belongs.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp indicating when the comment was created.
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         avatar_url:
 *           type: string
 *           description: The URL of the user's avatar.
 *     Topic:
 *       type: object
 *       properties:
 *         slug:
 *           type: string
 *           description: The unique identifier of the topic.
 *         description:
 *           type: string
 *           description: Description of the topic.
 */
