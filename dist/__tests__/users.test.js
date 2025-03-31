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
describe("USERS endpoints", () => {
    describe("getAllUsers", () => {
        test("GET 200: Responds with an array of 4 users", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body: { users }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users").expect(200);
            expect(users).toHaveLength(4);
            users.forEach((user) => {
                expect(user).toMatchObject({
                    userName: expect.any(String),
                    name: expect.any(String),
                });
            });
        }));
    });
    describe("getUserById", () => {
        test("GET - 200: Responds with a user by provided userName", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body: { user }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/4").expect(200);
            expect(user).toMatchObject({
                userName: "lurker",
                name: "do_nothing",
            });
        }));
        test("GET - 404: Responds with an appropriate error when nonexistent user_id passed", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body: { message }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/3000").expect(404);
            expect(message).toBe("No data found");
        }));
    });
});
