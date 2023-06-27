import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  changeConection,
  userConnected,
  userDisconnected,
} from "./handlersControllers";

export const app = express();

export const serverHttp = createServer(app);

export const io = new Server(serverHttp, {
  cors: {
    allowedHeaders: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("user-connected", (data) => userConnected(socket, data, io));

  socket.on("user-change-conection", (data) =>
    changeConection(socket, data, io)
  );

  socket.on("user-disconnected", () => userDisconnected(socket, io));

  socket.on("disconnect", () => userDisconnected(socket, io));
});
