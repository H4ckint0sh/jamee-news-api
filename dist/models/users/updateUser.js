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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const models = __importStar(require("../../db/models"));
const error_handling_1 = require("../../middleware/error-handling");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updateUser = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const user = yield models.User.findOne({
        where: { id: userId },
    });
    if (!user) {
        throw new error_handling_1.HttpError(404, "No data found");
    }
    if (updatedUserData.password) {
        user.password = yield bcryptjs_1.default.hash(updatedUserData.password, 8);
    }
    user.userName = (_a = updatedUserData.userName) !== null && _a !== void 0 ? _a : user.userName;
    user.roleId = (_b = updatedUserData.roleId) !== null && _b !== void 0 ? _b : user.roleId;
    user.name = (_c = updatedUserData.name) !== null && _c !== void 0 ? _c : user.name;
    user.avatar_url = (_d = updatedUserData.avatar_url) !== null && _d !== void 0 ? _d : user.avatar_url;
    yield user.save();
    return user;
});
exports.updateUser = updateUser;
