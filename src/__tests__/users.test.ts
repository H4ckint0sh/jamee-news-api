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
	describe("getAllUsers", () => {
		test("GET 200: Responds with an array of 4 users", async () => {
			const {
				body: { users },
			} = await request(app).get("/api/users").expect(200);
			expect(users).toHaveLength(4);
			users.forEach((user: User) => {
				expect(user).toMatchObject({
					userName: expect.any(String),
					name: expect.any(String),
				});
			});
		});
	});

	describe("getUserById", () => {
		test("GET - 200: Responds with a user by provided userName", async () => {
			const {
				body: { user },
			} = await request(app).get("/api/users/4").expect(200);
			expect(user).toMatchObject({
				userName: "lurker",
				name: "do_nothing",
			});
		});

		test("GET - 404: Responds with an appropriate error when nonexistent user_id passed", async () => {
			const {
				body: { message },
			} = await request(app).get("/api/users/3000").expect(404);
			expect(message).toBe("No data found");
		});
	});
});
