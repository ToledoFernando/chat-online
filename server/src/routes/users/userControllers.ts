import { Request, Response } from "express";
import { IUserRegister, HttpErrors, HttpSuccess } from "./userTypes";
import { database } from "../../db/pgdb";
import { RolesId } from "../../models/Roles/RolesTypes";
import bcrypt from "bcryptjs";
import { sendErrorResponse, sendSuccessResponse } from "../response";
import {
  codificarCorreoElectronico,
  decodificarCorreoElectronico,
} from "./Code";
import sendEmail from "../../email/EmailControllers";
import { IEmailVerify, TypeEmail } from "../../email/EmailTypes";
import { IUserModel } from "../../models/Users/UserAcoutnTypes";
import { generateToken } from "../../jwt/authMiddleware";
import { IUser } from "../../jwt/authMiddlewareTypes";

const { users } = database.models;

export const register = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { email, firstName, lastName, password, username } =
      req.body as IUserRegister;
    if (!email || !firstName || !lastName || !password || !username)
      return sendErrorResponse(res, 422, HttpErrors.missingData);

    const checkEmailUser = (await users.findOne({
      where: { email: email },
      transaction: t,
    })) as IUser | null;

    if (checkEmailUser) {
      await t.rollback();
      return sendErrorResponse(res, 409, HttpErrors.userAlreadyExists);
    }

    //Hash de contraseña con bcrypt
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await users.findOrCreate({
      where: { username: username },
      defaults: {
        email,
        firstName,
        lastName,
        password: hashPassword,
        username,
        rolId: RolesId.USER,
        lastConnection: Math.floor(Date.now() / 1000),
      },
      transaction: t,
    });

    if (!newUser[1]) {
      await t.rollback();
      return sendErrorResponse(res, 409, HttpErrors.userAlreadyExists);
    }

    const emailCode = codificarCorreoElectronico(email);
    const emailData = {
      userEmail: email,
      userFistname: firstName,
      userLastName: lastName,
      code: emailCode,
    } as IEmailVerify;

    sendEmail(TypeEmail.VERIFY, emailData);
    await t.commit();

    return sendSuccessResponse(res, 201, HttpSuccess.create);
  } catch (error: unknown | any) {
    await t.rollback();
    return sendErrorResponse(res, 400, error.message);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const code: string | undefined = req.params.code;
    if (!code) {
      await t.rollback();

      return sendErrorResponse(res, 422, HttpErrors.missingData);
    }

    const email = decodificarCorreoElectronico(code);

    const userDB = await users.findOne({ where: { email } });

    if (!userDB) {
      await t.rollback();
      return sendErrorResponse(res, 404, HttpErrors.userNotFount);
    }

    const result = await userDB.update({ verify: true });
    if (!result) return sendErrorResponse(res, 404, HttpErrors.userNotFount);

    await t.commit();
    return sendSuccessResponse(res, 200, HttpSuccess.verify);
  } catch (error: unknown | any) {
    await t.rollback();
    return sendErrorResponse(res, 400, error.message);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { email, password } = req.body;

    const userDB = (await users.findOne({
      where: { email },
    })) as IUserModel | null;

    if (!userDB) {
      // si no se encontro un usuario
      await t.rollback();
      return sendErrorResponse(res, 404, HttpErrors.userNotFount);
    }

    const checkPassword = bcrypt.compareSync(password, userDB.password);

    if (!checkPassword) {
      // si la contraseña hasheada no coincide
      await t.rollback();
      return sendErrorResponse(res, 401, HttpErrors.passwordInvalid);
    }

    if (!userDB.verify) {
      // si no esta verificado (por correo)
      await t.rollback();
      return sendErrorResponse(res, 401, HttpErrors.userNotVerify);
    }

    const dataToken = {
      id: userDB.id,
      username: userDB.username,
      email: userDB.email,
      rol: userDB.rolId,
    } as IUser;

    const token = generateToken(dataToken);

    const dataResponde = {
      id: userDB.id,
      email: userDB.email,
      isLogin: true,
      username: userDB.username,
      token: token,
    };

    return sendSuccessResponse(res, 200, {
      msg: HttpSuccess.login,
      user: dataResponde,
    });
  } catch (error: unknown | any) {
    await t.rollback();
    return sendErrorResponse(res, 400, error.message);
  }
};

export const checkAcountToken = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { id } = req.body;

    const userDB = (await users.findOne({
      where: { id },
    })) as IUserModel | null;

    if (!userDB) {
      // si no se encontro un usuario
      await t.rollback();
      return sendErrorResponse(res, 404, HttpErrors.userNotFount);
    }

    const dataToken = {
      id: userDB.id,
      username: userDB.username,
      email: userDB.email,
      rol: userDB.rolId,
    } as IUser;

    const token = generateToken(dataToken); // se genera un nuevo token

    const dataResponde = {
      id: userDB.id,
      email: userDB.email,
      isLogin: true,
      username: userDB.username,
      token: token,
    };

    return sendSuccessResponse(res, 200, {
      msg: HttpSuccess.login,
      user: dataResponde,
    });
  } catch (error: unknown | any) {
    await t.rollback();
    return sendErrorResponse(res, 400, error.message);
  }
};