import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || "key";

export const POSTGRESQL = process.env.PSQL as string;

export const MONGO_URI = process.env.MGDB as string;

export const CLIENT_URL = process.env.CLT_URL as string;

export const CRYPTO_KEY = process.env.CRYPTO_KEY as string;

export const CRYPTO_IV = process.env.CRYPTO_IV as string;

//Config email data
export const HOST = process.env.HOST as string;
export const PORT = process.env.PORT as string;
export const USER = process.env.USER as string;
export const PSSWD = process.env.PSSWD as string;
