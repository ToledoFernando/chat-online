import crypto from "crypto";
import dotenv from "dotenv";
import { CRYPTO_IV, CRYPTO_KEY } from "../../config/config";
dotenv.config();

const algorithm = "aes-256-cbc";

const key = Buffer.from(CRYPTO_KEY, "hex");
const iv = Buffer.from(CRYPTO_IV, "hex");

export function codificarCorreoElectronico(email: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encriptado = cipher.update(email, "utf8", "hex");
  encriptado += cipher.final("hex");
  return encriptado;
}

export function decodificarCorreoElectronico(codigo: string): string {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let desencriptado = decipher.update(codigo, "hex", "utf8");
  desencriptado += decipher.final("utf8");
  return desencriptado;
}
