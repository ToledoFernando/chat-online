import { Router } from "express";
import {
  checkAcountToken,
  register,
  userLogin,
  verifyUser,
} from "./userControllers";
import { authMiddleware } from "../../jwt/authMiddleware";

const route = Router();

route.post("/register", register);

route.get("/verify/:code", verifyUser);

route.post("/login", userLogin);

route.get("/check-acount", authMiddleware, checkAcountToken);

export default route;
