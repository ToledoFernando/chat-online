import { Router } from "express";
import userRouter from "./users/user";

const route = Router();

route.use("/user", userRouter);

export default route;
