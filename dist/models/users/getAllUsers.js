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
exports.getAllUsers = void 0;
const models = __importStar(require("../../db/models"));
const error_handling_1 = require("../../middleware/error-handling");
const getAllUsers = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    let { sort_by, order, limit, p } = queries;
    // Validation
    sort_by = sort_by === "null" ? undefined : sort_by;
    order = order === "null" ? undefined : order;
    // sort_by = sort_by || "created_at";
    order = order || "desc";
    limit = limit || 10;
    p = p || 1;
    const acceptedQueries = ["asc", "desc"];
    const acceptedSortQueries = [
        "user_id",
        "name",
        "roleId",
        "userName",
    ];
    if (sort_by && !acceptedSortQueries.includes(sort_by) ||
        order && !acceptedQueries.includes(order)) {
        throw new error_handling_1.HttpError(400, "Bad query value!");
    }
    const offset = +limit * +p - limit;
    const findOptions = {
        attributes: [
            "user_id",
            "name",
            "userName",
            "roleId",
        ],
        // group: ["users.roleId", "user.roleId"],
        subQuery: false,
    };
    if (sort_by && order) {
        findOptions.order = [[sort_by, order]];
    }
    if (limit) {
        findOptions.limit = limit;
        findOptions.offset = offset;
    }
    const users = yield models.User.findAll(findOptions);
    return users;
});
exports.getAllUsers = getAllUsers;
