/**
 * @description Tipos de emails
 * @enum {string}
 */
export enum TypeEmail {
  VERIFY = "VERIFY",
  ADVERTENCIA = "ADVERTENCIA",
  LOGIN = "LOGIN",
  RESET = "RESET",
  MESSAGE = "MESSAGE",
}

/**
 * @description Interface base para enviar emails
 */
interface IEmailUser {
  userEmail: string;
  userFistname: string;
  userLastName: string;
}

/**
 * @description Interface para enviar emails de verificacion
 * @extends IEmailUser
 */
export interface IEmailVerify extends IEmailUser {
  code: string;
}

/**
 * @description Interface para enviar emails de advertencias
 * @extends IEmailUser
 */
export interface IEmailAdv extends IEmailUser {
  message: string;
}

/**
 * @description Interface para enviar emails sobre login
 * @extends IEmailAdv
 */
export interface IEmailLogin extends IEmailAdv {
  ip: string;
}

/**
 * @description Interface para enviar emails sobre cambio de contraseña
 * @extends IEmailUser
 */
export interface IEmailReset extends IEmailUser {
  newPassword: string;
}

/**
 * @description Interface para enviar emails sobre mensajes recibidos
 * @extends IEmailAdv
 */
export interface IEmailMessage extends IEmailAdv {
  from: string;
}

export type DataTypeEmail =
  | IEmailAdv
  | IEmailLogin
  | IEmailMessage
  | IEmailReset
  | IEmailVerify;
