import request from "supertest";
import app from "../app";

import seed from "../db/seeds/seed";
import db from "../db/connection";

import testData from "../db/data/test-data/index";

import { User } from "../db/data/types";

beforeEach(async () => {
  await seed(testData);
});

afterAll(async () => {
  await db.close();
});

describe("USERS endpoints", () => {
  describe("getUsers", () => {
    test("GET 200: Responds with an array of 4 users", async () => {
      const {
        body: { users },
      } = await request(app).get("/api/users").expect(200);
      expect(users).toHaveLength(4);
      users.forEach((user: User) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
    });
  });

  describe("getUserByUserName", () => {
    test("GET - 200: Responds with a user by provided username", async () => {
      const {
        body: { user },
      } = await request(app).get("/api/users/lurker").expect(200);
      expect(user).toMatchObject({
        username: "lurker",
        name: "do_nothing",
        avatar_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      });
    });

    test("GET - 404: Responds with an appropriate error when nonexistent username passed", async () => {
      const {
        body: { message },
      } = await request(app).get("/api/users/malina").expect(404);
      expect(message).toBe("No data found");
    });
  });
});
