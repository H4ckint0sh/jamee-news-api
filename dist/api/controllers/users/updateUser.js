"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const usersModel = __importStar(require("../../../models/users"));
const roleModel = __importStar(require("../../../models/roles"));
const error_handling_1 = require("../../../middleware/error-handling");
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const allQueries = req.query;
        if (isNaN(userId)) {
            throw new error_handling_1.ValidationError("Invalid user id provided");
        }
        const { userName, password, roleId, name, avatar_url } = req.body;
        if (!userName || !password || !roleId || !name || !avatar_url) {
            throw new error_handling_1.ValidationError("Invalid user data provided");
        }
        const existingUser = yield usersModel.getAllUsers(allQueries).then(users => users.find(user => user.userName === userName));
        if (existingUser) {
            throw new error_handling_1.ValidationError('Username already exists');
        }
        const role = yield roleModel.getRoleById(roleId);
        if (!role) {
            throw new error_handling_1.ValidationError('Role not found');
        }
        const updatedUser = yield usersModel.updateUser(userId, req.body);
        if (!updatedUser) {
            throw new error_handling_1.ValidationError('User not found');
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             userName: "newuser"
 *             password: "password123"
 *             roleId: 2
 *             name: "John Doe"
 *             avatar_url: "https://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input
 */
