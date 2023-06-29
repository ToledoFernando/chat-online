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
  twoConnection = "Ya existe una conexion activa",
}

/**
 * @description Enum para los codigos de exito HTTP en la ruta de usuario
 */
export enum HttpSuccess {
  create = "Usuario creado con exito, se envio un correo para que verifique su cuenta",
  login = "Usuario logueado con exito",
  verify = "¡Usuario verificado con exito!",
}
