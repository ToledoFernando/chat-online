import { Router } from "express";
import userRouter from "./users/user";
import chatsRouter from "./chats/chats";

const route = Router();

route.use("/user", userRouter);

route.use("/chats/", chatsRouter);

export default route;
