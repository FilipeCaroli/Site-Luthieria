import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultStorage = path.resolve(__dirname, "../../data/database.sqlite");
const storage = process.env.SQLITE_STORAGE ?? defaultStorage;

fs.mkdirSync(path.dirname(storage), { recursive: true });

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});
