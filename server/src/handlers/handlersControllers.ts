import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IUserConnected } from "./HandlersTypes";
import { database } from "../db/pgdb";
import { Model } from "sequelize";
import { IUserModel } from "../models/Users/UserAcoutnTypes";
import { IUser } from "../jwt/authMiddlewareTypes";
import { generateToken } from "../jwt/authMiddleware";

const { users } = database.models;

export const userConnected = async (
  socket: Socket<DefaultEventsMap, any>,
  userID: string,
  io: Server
) => {
  const user = await users.findOne({ where: { id: userID } });
  const result = await user?.update({
    socketId: socket.id,
    connected: "online",
  });
  io.to(socket.id).emit("user-conected", result as Model);
};

export const changeConection = async (
  socket: Socket<DefaultEventsMap | any>,
  dataId: string,
  io: Server
) => {
  const user: Model<IUserModel, any> | null | any = await users.findOne({
    where: { id: dataId },
  });

  io.to(user?.socketId).emit("user-conected-chane");

  const userDB = await user.update({
    socketId: socket.id,
    connected: "online",
  });

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
  io.to(socket.id).emit("user-conected-chane-apply", dataResponde);
};

export const userDisconnected = async (
  socket: Socket<DefaultEventsMap, any>,
  io: Server
) => {
  const user = await users.findOne({ where: { socketId: socket.id } });
  const fechaActual = new Date();
  let fechaUnix = Math.floor(fechaActual.getTime() / 1000);
  await user?.update({
    connected: "offline",
    socketId: "",
    lastConnection: fechaUnix,
  });
  io.to(socket.id).emit("user-disconnected");
};
