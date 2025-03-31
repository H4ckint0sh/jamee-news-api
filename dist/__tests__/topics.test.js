"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const seed_1 = __importDefault(require("../db/seeds/seed"));
const connection_1 = __importDefault(require("../db/connection"));
const index_1 = __importDefault(require("../db/data/test-data/index"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.default)(index_1.default);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.close();
}));
describe("TOPICS endpoints", () => {
    test("200 - GET: Responds with an array of 3 topics", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { topics }, } = yield (0, supertest_1.default)(app_1.default).get("/api/topics").expect(200);
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
        });
    }));
    test("201 - POST: Responds with a newly created topic", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTopicBody = {
            slug: "tigers",
            description: "tiger's life in the forest",
        };
        const { body: { newTopic }, } = yield (0, supertest_1.default)(app_1.default).post("/api/topics").send(newTopicBody).expect(201);
        expect(newTopic).toMatchObject({
            slug: "tigers",
            description: "tiger's life in the forest",
        });
    }));
    test("201 - POST: Responds with a newly created topic when no description passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTopicBody = {
            slug: "tigers",
        };
        const { body: { newTopic }, } = yield (0, supertest_1.default)(app_1.default).post("/api/topics").send(newTopicBody).expect(201);
        expect(newTopic).toMatchObject({
            slug: "tigers",
            description: expect.any(String),
        });
    }));
    test("400 - POST: Responds with an appropriate error message whe missing slug key", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTopic = {
            description: "tiger's life in the forest",
        };
        const { body: { message }, } = yield (0, supertest_1.default)(app_1.default).post("/api/topics").send(newTopic).expect(400);
        expect(message).toBe("Bad request");
    }));
});
