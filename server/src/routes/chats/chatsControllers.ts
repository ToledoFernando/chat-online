import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../response";
import { Op, Transaction } from "sequelize";
import { database } from "../../db/pgdb";

const { Chats, Users, Messages } = database.models;

export const getAllMyChats = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { id } = req.body;

    const chats = await Chats.findAll({
      where: {
        [Op.or]: [
          {
            userId1: id,
          },
          {
            userId2: id,
          },
        ],
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

    await t.commit();

    sendSuccessResponse(res, 200, chats);
  } catch (error: unknown | any) {
    await t.rollback();
    sendErrorResponse(res, 400, error.message);
  }
};

export const createChat = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { user1, user2 } = req.body;

    const chatExists = await Chats.findOne({
      where: {
        [Op.or]: [
          {
            userId1: user1,
            userId2: user2,
          },
          {
            userId1: user2,
            userId2: user1,
          },
        ],
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

    if (chatExists) {
      await t.commit();
      return sendSuccessResponse(res, 200, chatExists);
    }

    const newChat: any = await Chats.create(
      {
        userId1: user1,
        userId2: user2,
      },
      {
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
        returning: true,
      }
    );

    const createdChat = await Chats.findByPk(newChat.id, {
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

    await t.commit();

    sendSuccessResponse(res, 201, createdChat);
  } catch (error: unknown | any) {
    await t.rollback();
    sendErrorResponse(res, 400, error.message);
  }
};

export const getAllMessagesChat = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { chatId } = req.params;

    const mensajes = await Messages.findAll({
      where: { ChatId: chatId },
      transaction: t,
    });

    await t.commit();

    sendSuccessResponse(res, 200, mensajes);
  } catch (error: unknown | any) {
    await t.rollback();
    sendErrorResponse(res, 400, error.message);
  }
};
