import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  PORT,
} from "./config.js";

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
  ssl: { rejectUnauthorized: false }, // <--- Habilita SSL
});