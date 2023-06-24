export interface IUserRegister {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

/**
 * @description Enum para los codigos de errores HTTP en la ruta de usuario
 */
export enum HttpErrors {
  userNotFount = "Usuario no encontrado",
  userAlreadyExists = "Ya existe un usuario con ese email",
  passwordInvalid = "Contraseña invalida",
  emailInvalid = "Email invalido",
  userNotVerify = "Usuario no verificado",
  missingData = "Faltan Datos",
}

/**
 * @description Enum para los codigos de exito HTTP en la ruta de usuario
 */
export enum HttpSuccess {
  create = "usuario creado con exito, se envio un correo para que verifique su cuenta",
  login = "usuario logueado con exito",
  verify = "usuario verificado con exito",
}
