import request from "supertest";
import app from "../app";

import seed from "../db/seeds/seed";
import db from "../db/connection";

import testData from "../db/data/test-data/index";

import { Comment } from "../db/data/types";

beforeEach(async () => {
  await seed(testData);
});

afterAll(async () => {
  await db.close();
});

describe("COMMENTS endpoints", () => {
  describe("getCommentsByArticleId", () => {
    test("200 - GET: Responds with an array of 2 comments", async () => {
      const {
        body: { comments },
      } = await request(app).get("/api/articles/5/comments").expect(200);
      expect(comments).toHaveLength(2);
      comments.forEach((comment: Comment) => {
        expect(comment.article_id).toBe(5);
        expect(comment).toHaveProperty("comment_id");
        expect(comment).toHaveProperty("body");
        expect(comment).toHaveProperty("article_id");
        expect(comment).toHaveProperty("author");
        expect(comment).toHaveProperty("votes");
        expect(comment).toHaveProperty("created_at");
      });
    });

    test("200 - GET: Responds with an array of 2 comments sorted and ordered", async () => {
      const {
        body: { comments },
      } = await request(app).get("/api/articles/5/comments").expect(200);
      expect(comments).toHaveLength(2);
      expect(comments).toBeSorted({
        key: "created_at",
        descending: true,
      });
    });

    test("200 - GET: Responds with an array of 10 comments on the 1 page", async () => {
      const {
        body: { comments },
      } = await request(app).get("/api/articles/1/comments?p=1").expect(200);
      expect(comments).toHaveLength(10);
    });

    test("200 - GET: Responds with an array of 1 comment on the 2 page", async () => {
      const {
        body: { comments },
      } = await request(app).get("/api/articles/1/comments?p=2").expect(200);
      expect(comments).toHaveLength(1);
    });

    test("400 - GET: Responds with an appropriate error when invalid page passed", async () => {
      const {
        body: { message },
      } = await request(app)
        .get("/api/articles/1/comments?p=blahpage")
        .expect(400);
      expect(message).toBe("Bad query value!");
    });

    test("400 - GET: Responds with an appropriate error when invalid limit passed", async () => {
      const {
        body: { message },
      } = await request(app)
        .get("/api/articles/1/comments?p=1&limit=blahlimit")
        .expect(400);
      expect(message).toBe("Bad query value!");
    });

    test("400 - GET: Responds with appropriate error code and body message", async () => {
      const {
        body: { message },
      } = await request(app)
        .get("/api/articles/my_article/comments")
        .expect(400);
      expect(message).toBe("Invalid article id provided");
    });

    test("404 - GET: Responds with appropriate error code and body message", async () => {
      const {
        body: { message },
      } = await request(app).get("/api/articles/999/comments").expect(404);
      expect(message).toBe("No data found");
    });

    test("200 - GET: Responds with appropriate status code and body message", async () => {
      const {
        body: { comments },
      } = await request(app).get("/api/articles/2/comments").expect(200);
      expect(comments).toEqual([]);
    });
  });
  describe("createComment", () => {
    test("201 - POST: Responds with a newly created comment object", async () => {
      const comment = {
        username: "lurker",
        body: "This is a test comment.",
      };
      const {
        body: { newComment },
      } = await request(app)
        .post("/api/articles/2/comments")
        .send(comment)
        .expect(201);
      expect(newComment).toMatchObject({
        comment_id: 19,
        body: "This is a test comment.",
        votes: 0,
        author: "lurker",
        article_id: 2,
        created_at: expect.any(String),
      });
    });

    test("400 - POST: Responds with appropriate error when invalid article_id provided", async () => {
      const comment = {
        username: "lurker",
        body: "This is a test comment.",
      };
      const {
        body: { message },
      } = await request(app)
        .post("/api/articles/my_article/comments")
        .send(comment)
        .expect(400);
      expect(message).toBe("Invalid article id provided");
    });

    test("400 - POST: Responds with appropriate error when missing fields on body provided", async () => {
      const comment = {
        username: "lurker",
      };
      const {
        body: { message },
      } = await request(app)
        .post("/api/articles/2/comments")
        .send(comment)
        .expect(400);
      expect(message).toBe("Bad request");
    });

    test("400 - POST: Responds with appropriate error when the provided body is not a string", async () => {
      const comment = {
        username: "lurker",
        body: 1234,
      };
      const {
        body: { message },
      } = await request(app)
        .post("/api/articles/2/comments")
        .send(comment)
        .expect(400);
      expect(message).toBe("Bad request");
    });

    test("404 - POST: Responds with appropriate error when nonexistent article_id provided", async () => {
      const comment = {
        username: "malina",
        body: "This is a test comment.",
      };
      const {
        body: { message },
      } = await request(app)
        .post("/api/articles/999/comments")
        .send(comment)
        .expect(404);
      expect(message).toBe("No key found");
    });

    test("404 - POST: Responds with appropriate error when nonexistent username passed", async () => {
      const comment = {
        username: "malina",
        body: "This is a test comment.",
      };
      const {
        body: { message },
      } = await request(app)
        .post("/api/articles/2/comments")
        .send(comment)
        .expect(404);
      expect(message).toBe("No key found");
    });
  });

  describe("deleteComment", () => {
    test("204 - DELETE: Responds with an appropriate status code", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });

    test("400 - DELETE: Responds with an appropriate error when invalid comment_id provided", async () => {
      const {
        body: { message },
      } = await request(app).delete("/api/comments/blahcomment").expect(400);
      expect(message).toBe("Bad request");
    });

    test("404 - DELETE: Responds with an appropriate error when nonexistent comment_id provided", async () => {
      const {
        body: { message },
      } = await request(app).delete("/api/comments/757").expect(404);
      expect(message).toBe("No data found");
    });
  });

  describe("patchComment", () => {
    test("200 - PATCH: Responds with an updated comment", async () => {
      const votes = { inc_vote: -1 };
      const {
        body: { updatedComment },
      } = await request(app).patch("/api/comments/1").send(votes).expect(200);
      expect(updatedComment).toMatchObject({
        comment_id: 1,
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 15,
        author: "butter_bridge",
        article_id: 9,
        created_at: expect.any(String),
      });
    });

    test("400 - PATCH: Responds with an appropriate error when invalid comment_id provided", async () => {
      const votes = {
        inc_vote: 5,
      };
      const {
        body: { message },
      } = await request(app)
        .patch("/api/comments/blahblah")
        .send(votes)
        .expect(400);
      expect(message).toBe("Bad request");
    });

    test("400 - PATCH: Responds with an appropriate error when invalid inc_vote provided", async () => {
      const votes = {
        inc_vote: "sdfsdf",
      };
      const {
        body: { message },
      } = await request(app).patch("/api/comments/3").send(votes).expect(400);
      expect(message).toBe("Bad request");
    });

    test("404 - PATCH: Responds with an appropriate error when nonexistent comment_id provided", async () => {
      const votes = {
        inc_vote: 5,
      };
      const {
        body: { message },
      } = await request(app).patch("/api/comments/555").send(votes).expect(404);
      expect(message).toBe("No data found");
    });
  });
});
