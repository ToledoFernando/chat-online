import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || "key";

export const POSTGRESQL = process.env.PSQL as string;

export const MONGO_URI =
  (process.env.MGDB as string) || "mongodb://localhost:27017/chatonline";

export const CLIENT_URL =
  (process.env.CLT_URL as string) || "http://localhost:5173";

export const CRYPTO_KEY =
  (process.env.CRYPTO_KEY as string) ||
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export const CRYPTO_IV =
  (process.env.CRYPTO_IV as string) || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

//Config email data
export const HOST = (process.env.HOST as string) || "smtp.local.com";
export const PORT = (process.env.PORT as string) || 465;
export const USER = (process.env.USER as string) || "example.test@example.com";
export const PSSWD = (process.env.PSSWD as string) || "xxxxxxxxxxxxx";
