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
exports.register = void 0;
const usersModel = __importStar(require("../../../models/users"));
const roleModel = __importStar(require("../../../models/roles"));
const error_handling_1 = require("../../../middleware/error-handling");
const utils_1 = require("../../../utils");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, roleId } = req.body;
        const allQueries = req.query;
        if (!userName || !password || !roleId) {
            throw new error_handling_1.ValidationError('Username, password, and role ID are required.');
        }
        // Validación de existencia del rol
        const role = yield roleModel.getRoleById(roleId);
        if (!role) {
            throw new error_handling_1.ValidationError('Role not found.');
        }
        // Verificación de que el nombre de usuario no esté repetido
        const existingUsers = yield usersModel.getAllUsers(allQueries);
        const existingUser = existingUsers.find(user => user.userName === userName);
        if (existingUser) {
            throw new error_handling_1.ValidationError('Username already exists.');
        }
        const newUser = yield usersModel.createUser(req.body);
        const token = (0, utils_1.generateToken)(newUser);
        res.status(201).send({ auth: true, token });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user registration and login.
 */
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's userName
 *               password:
 *                 type: string
 *                 description: The user's password
 *               roleId:
 *                 type: integer
 *                 description: The ID of the role assigned to the user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing userName, password, or role ID
 *       404:
 *         description: Role not found
 *     security: []  # This route does not require bearer authentication
 */
