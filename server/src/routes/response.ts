import { Response } from "express";

/**
 * @description Funcion que envia una  respuesta de error al cliente
 * @param res Type de respuesta
 * @param statusCode Codigo de error HTTP
 * @param message Mensaje del Error
 * @returns
 */
export function sendErrorResponse(
  res: Response,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({ error: message });
}

/**
 *@description Funcion que envia una respuesta de exito al cliente
 * @param res Type de respuesta
 * @param statusCode Codigo de respuesta HTTP
 * @param data Dato que se envia en la respuesta
 * @returns
 */
export function sendSuccessResponse(
  res: Response,
  statusCode: number,
  data: any
) {
  return res.status(statusCode).json(data);
}
