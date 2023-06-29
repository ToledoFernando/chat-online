import { Router } from "express";
import {
  createChat,
  getAllMessagesChat,
  getAllMyChats,
} from "./chatsControllers";
import { authMiddleware } from "../../jwt/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllMyChats);

router.post("/new", authMiddleware, createChat);

router.get("/messages/:chatId", authMiddleware, getAllMessagesChat);

export default router;
