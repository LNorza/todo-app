import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const MONGODB_URI = process.env.MONGODB_URI;
