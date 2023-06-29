import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "./authMiddlewareTypes";
import { JWT_SECRET } from "../config/config";

export const generateToken = (userData: IUser): string => {
  return jwt.sign(userData, JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getheader = req.headers.authorization;
    if (!getheader) {
      throw new Error("Token no encontrado");
    }

    const token = getheader.split(" ")[1];

    const user = jwt.verify(token, JWT_SECRET) as IUser;
    req.body = { ...req.body, id: user.id };
    next();
  } catch (error: unknown | any) {
    res.status(400).json({ error: error.message });
  }
};
