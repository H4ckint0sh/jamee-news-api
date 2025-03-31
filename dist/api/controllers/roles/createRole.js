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
exports.createRole = void 0;
const rolesModel = __importStar(require("../../../models/roles"));
const error_handling_1 = require("../../../middleware/error-handling");
const createRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, status } = req.body;
        if (!name || typeof status !== 'boolean') {
            throw new error_handling_1.ValidationError("Invalid role data");
        }
        // Check if the role name already exists
        const existingRole = yield rolesModel.getAllRoles().then(roles => roles.find(role => role.name === name));
        if (existingRole) {
            throw new error_handling_1.ValidationError("Role name already exists");
        }
        const newRole = yield rolesModel.createRole(req.body);
        res.status(201).send({ newRole });
    }
    catch (error) {
        next(error);
    }
});
exports.createRole = createRole;
/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           example:
 *             name: "Admin"
 *             status: true
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request, invalid input
 */
