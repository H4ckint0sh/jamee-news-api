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
const connection_1 = __importDefault(require("../connection"));
const seed_1 = __importDefault(require("./seed"));
const test_data_1 = __importDefault(require("../data/test-data"));
const development_data_1 = __importDefault(require("../data/development-data"));
const ENV = process.env.NODE_ENV || "development";
const runDevSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.default)(development_data_1.default);
    return connection_1.default.close();
});
const runTestSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.default)(test_data_1.default);
    return connection_1.default.close();
});
if (ENV === "test") {
    runTestSeed();
}
else {
    runDevSeed();
}
