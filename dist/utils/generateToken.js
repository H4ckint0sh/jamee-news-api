"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY;
function generateToken(user) {
    if (SECRET_KEY) {
        return jsonwebtoken_1.default.sign({ user_id: user.user_id, userName: user.userName, roleId: user.roleId, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    }
}
exports.generateToken = generateToken;
