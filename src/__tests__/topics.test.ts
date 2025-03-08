import request from "supertest";
import app from "../app";

import seed from "../db/seeds/seed";
import db from "../db/connection";

import testData from "../db/data/test-data/index";

import { Topic } from "../db/data/types";

beforeEach(async () => {
  await seed(testData);
});

afterAll(async () => {
  await db.close();
});

describe("TOPICS endpoints", () => {
  test("200 - GET: Responds with an array of 3 topics", async () => {
    const {
      body: { topics },
    } = await request(app).get("/api/topics").expect(200);
    expect(topics).toHaveLength(3);
    topics.forEach((topic: Topic) => {
      expect(topic).toHaveProperty("slug");
      expect(topic).toHaveProperty("description");
    });
  });

  test("201 - POST: Responds with a newly created topic", async () => {
    const newTopicBody = {
      slug: "tigers",
      description: "tiger's life in the forest",
    };
    const {
      body: { newTopic },
    } = await request(app).post("/api/topics").send(newTopicBody).expect(201);
    expect(newTopic).toMatchObject({
      slug: "tigers",
      description: "tiger's life in the forest",
    });
  });

  test("201 - POST: Responds with a newly created topic when no description passed", async () => {
    const newTopicBody = {
      slug: "tigers",
    };
    const {
      body: { newTopic },
    } = await request(app).post("/api/topics").send(newTopicBody).expect(201);
    expect(newTopic).toMatchObject({
      slug: "tigers",
      description: expect.any(String),
    });
  });

  test("400 - POST: Responds with an appropriate error message whe missing slug key", async () => {
    const newTopic = {
      description: "tiger's life in the forest",
    };
    const {
      body: { message },
    } = await request(app).post("/api/topics").send(newTopic).expect(400);
    expect(message).toBe("Bad request");
  });
});
