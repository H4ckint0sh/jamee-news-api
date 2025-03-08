const { Sequelize } = require("sequelize");

import dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`,
});

if (!process.env.PG_DATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config: any = {
  dialect: "postgres",
  logging: false,
  host: "localhost",
};

const supabaseString = process.env.DATABASE_URL;

const db =
  ENV === "production"
    ? new Sequelize(supabaseString)
    : new Sequelize(
        process.env.PG_DATABASE,
        process.env.PG_USER,
        process.env.PG_PASSWORD,
        config
      );

export default db;
