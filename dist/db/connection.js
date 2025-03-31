"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({
    path: `${__dirname}/../../.env.${ENV}`,
});
if (!process.env.PG_DATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
const config = {
    dialect: "postgres",
    logging: false,
    host: "localhost",
};
const supabaseString = process.env.DATABASE_URL;
const db = ENV === "production"
    ? new Sequelize(supabaseString)
    : new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, config);
exports.default = db;
