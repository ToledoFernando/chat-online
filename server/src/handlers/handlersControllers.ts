import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IMessage, IUserConnected } from "./HandlersTypes";
import { database } from "../db/pgdb";
import { Model, Op } from "sequelize";
import { IUserModel } from "../models/Users/UserAcoutnTypes";
import { IUser } from "../jwt/authMiddlewareTypes";
import { generateToken } from "../jwt/authMiddleware";

const { Users, Messages, Chats } = database.models;

export const userConnected = async (
  socket: Socket<DefaultEventsMap, any>,
  userID: string,
  io: Server
) => {
  const t = await database.transaction();
  try {
    const user = await Users.findOne({ where: { id: userID }, transaction: t });
    if (!user) {
      await t.rollback();
      return;
    }

    const result = await user.update(
      {
        socketId: socket.id,
        connected: "online",
      },
      {
        transaction: t,
      }
    );
    console.log("#####################################");
    const chatsAll: any = await Chats.findAll({
      where: {
        [Op.or]: [{ userId1: userID }, { userId2: userID }],
      },
      include: [
        {
          model: Users,
          as: "user1",
          attributes: {
            exclude: ["password", "listUseLock", "updatedAt", "createdAt"],
          },
        },
        {
          model: Users,
          as: "user2",
          attributes: {
            exclude: ["password", "listUseLock", "updatedAt", "createdAt"],
          },
        },
      ],
      transaction: t,
    });

    for (let i = 0; i < chatsAll.length; i++) {
      console.log("====================================");
      console.log(`UserID 1: ${chatsAll[i].user1.id}`);
      console.log(`UserID 2: ${chatsAll[i].user2.id}`);
      console.log(`My ID: ${userID}`);
      console.log("====================================");
      if (
        chatsAll[i].user1.id != userID &&
        chatsAll[i].user1.connected == "online"
      )
        // para saber que usuario esta online
        io.to(chatsAll[i].user1.socketId).emit(
          "new-user-connected",
          chatsAll[i].user2
          // chatsAll[i].user1.id
        );
      else if (
        chatsAll[i].user2.id != userID &&
        chatsAll[i].user2.connected == "online"
      )
        // para saber que usuario esta online
        io.to(chatsAll[i].user2.socketId).emit(
          "new-user-connected",
          chatsAll[i].user1
        );
    }
    console.log("#####################################");

    await t.commit();
    io.to(socket.id).emit("user-conected", result as Model);
  } catch (error) {
    await t.rollback();
  }
};

export const changeConection = async (
  socket: Socket<DefaultEventsMap | any>,
  dataId: string,
  io: Server
) => {
  const t = await database.transaction();
  try {
    const user: Model<IUserModel, any> | null | any = await Users.findOne({
      where: { id: dataId },
      transaction: t,
    });

    io.to(user?.socketId).emit("user-conected-chane");

    const userDB = await user.update(
      {
        socketId: socket.id,
        connected: "online",
      },
      {
        transaction: t,
      }
    );

    const dataToken = {
      id: userDB.id,
      username: userDB.username,
      email: userDB.email,
      rol: userDB.rolId,
    } as IUser;

    const token = generateToken(dataToken);

    const dataResponse = {
      id: userDB.id,
      email: userDB.email,
      isLogin: true,
      username: userDB.username,
      token: token,
    };
    await t.commit();
    io.to(socket.id).emit("user-conected-chane-apply", dataResponse);
  } catch (error) {
    await t.rollback();
  }
};

export const userDisconnected = async (
  socket: Socket<DefaultEventsMap, any>,
  io: Server
) => {
  const t = await database.transaction();
  try {
    const user: any = await Users.findOne({
      where: { socketId: socket.id },
      transaction: t,
    });
    const fechaActual = new Date();
    let fechaUnix = Math.floor(fechaActual.getTime() / 1000);
    await user?.update(
      {
        connected: "offline",
        socketId: "",
        lastConnection: fechaUnix,
      },
      { transaction: t }
    );

    console.log("#####################################");
    const chatsAll: any = await Chats.findAll({
      where: {
        [Op.or]: [{ userId1: user.id }, { userId2: user.id }],
      },
      include: [
        {
          model: Users,
          as: "user1",
          attributes: {
            exclude: ["password", "listUseLock", "updatedAt", "createdAt"],
          },
        },
        {
          model: Users,
          as: "user2",
          attributes: {
            exclude: ["password", "listUseLock", "updatedAt", "createdAt"],
          },
        },
      ],
      transaction: t,
    });

    for (let i = 0; i < chatsAll.length; i++) {
      if (
        chatsAll[i].user1.id != user.id &&
        chatsAll[i].user1.connected == "online"
      )
        // para saber que usuario esta online
        io.to(chatsAll[i].user1.socketId).emit(
          "new-user-disconnected",
          chatsAll[i].user2
          // chatsAll[i].user1.id
        );
      else if (
        chatsAll[i].user2.id != user.id &&
        chatsAll[i].user2.connected == "online"
      )
        // para saber que usuario esta online
        io.to(chatsAll[i].user2.socketId).emit(
          "new-user-disconnected",
          chatsAll[i].user1
          // chatsAll[i].user2.id
        );
    }
    console.log("#####################################");

    await t.commit();
    io.to(socket.id).emit("user-disconnected");
  } catch (error) {
    await t.rollback();
    io.to(socket.id).emit("user-disconnected");
  }
};

export const createNewMessage = async (
  socket: Socket<DefaultEventsMap>,
  data: IMessage,
  io: Server,
  callback: any
) => {
  const t = await database.transaction();
  try {
    const userTo: any = await Users.findOne({
      where: { id: data.to },
      transaction: t,
    });
    if (!userTo) {
      await t.rollback();
      return;
    }

    const newMessage: any = await Messages.create(
      {
        msg_content: data.msg_content,
        isFile: data.isFile,
        type: data.type,
        user_id: data.to,
        ChatId: data.ChatId,
        timestamp: data.timestamp,
      },
      {
        transaction: t,
      }
    );

    await Chats.update(
      {
        MessageId: newMessage.id,
      },
      {
        where: { id: data.ChatId },
        transaction: t,
      }
    );

    if (userTo.connected === "online")
      io.to(userTo.socketId).emit("new-message", newMessage);

    await t.commit();
    callback(newMessage);
  } catch (error) {
    await t.rollback();
  }
};
