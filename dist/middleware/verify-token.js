"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handling_1 = require("./error-handling");
//TODO: Get rid of your_secret_key
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        throw new error_handling_1.HttpError(403, 'No token provided.');
    }
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new error_handling_1.HttpError(403, 'Invalid token format.');
    }
    jsonwebtoken_1.default.verify(tokenParts[1], SECRET_KEY, (err, decoded) => {
        if (err || !decoded) {
            res.status(500).json({ message: 'Failed to authenticate token.' });
            return;
        }
        req.user = decoded;
        next();
    });
}
exports.verifyToken = verifyToken;
