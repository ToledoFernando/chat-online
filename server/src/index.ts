import express from "express";
import { database } from "./db/pgdb";
import { mongoConn } from "./db/mongodb";
import cors from "cors";
import morgan from "morgan";
import route from "./routes/routes";
import { serverHttp, app } from "./handlers/Handler";
import { Roles, RolesId } from "./models/Roles/RolesTypes";

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(route);

serverHttp.listen(4000, async () => {
  try {
    // const mongoDB = await mongoConn();
    // console.log(mongoDB);
    await database.sync({ force: true });
    // await database.sync();

    await database.models.Rol.bulkCreate([
      { id: RolesId.ADMIN, name: Roles.ADMIN },
      { id: RolesId.USER, name: Roles.USER },
      { id: RolesId.BANNED, name: Roles.BANNED },
    ]);

    await database.models.Users.create({
      id: "954a2308-8d0f-4791-bb0a-6dac5b33d050",
      firstName: "toledo",
      lastName: "fernando",
      username: "123123",
      email: "toledof764@gmail.com",
      password: "$2a$10$WFc9cRyx5.j5kA.vXqwayOjQN1BAXiV9YexQFWF7G6iprEIuUZ0HO",
      profileIMG: "",
      verify: true,
      connected: "offline",
      lastConnection: 1688106084,
      banned: false,
      listUseLock: [],
      socketId: "",
      RolId: "915e22b1-3fa2-4804-b8d2-2c1d170fdf84",
    });

    await database.models.Users.create({
      id: "954a2308-8d0f-4791-bb0a-6dac5b33d052",
      firstName: "fernando",
      lastName: "toledo",
      username: "xdxdxdddd",
      email: "123@gmail.com",
      password: "$2a$10$WFc9cRyx5.j5kA.vXqwayOjQN1BAXiV9YexQFWF7G6iprEIuUZ0HO",
      profileIMG: "",
      verify: true,
      connected: "offline",
      lastConnection: 1688106084,
      banned: false,
      listUseLock: [],
      socketId: "",
      RolId: "915e22b1-3fa2-4804-b8d2-2c1d170fdf84",
    });

    await database.models.Users.create({
      id: "954a2308-8d0f-4791-bb0a-6dac5b33d054",
      firstName: "ferchu",
      lastName: "xdxd",
      username: "toledo.dev",
      email: "12345@gmail.com",
      password: "$2a$10$WFc9cRyx5.j5kA.vXqwayOjQN1BAXiV9YexQFWF7G6iprEIuUZ0HO",
      profileIMG: "",
      verify: true,
      connected: "offline",
      lastConnection: 1688106084,
      banned: false,
      listUseLock: [],
      socketId: "",
      RolId: "915e22b1-3fa2-4804-b8d2-2c1d170fdf84",
    });

    await database.models.Users.create({
      id: "954a2308-8d0f-4791-bb0a-6dac5b33d056",
      firstName: "fernando2",
      lastName: "toledo2",
      username: "toledo",
      email: "1234@gmail.com",
      password: "$2a$10$WFc9cRyx5.j5kA.vXqwayOjQN1BAXiV9YexQFWF7G6iprEIuUZ0HO",
      profileIMG: "",
      verify: true,
      connected: "offline",
      lastConnection: 1688106084,
      banned: false,
      listUseLock: [],
      socketId: "",
      RolId: "915e22b1-3fa2-4804-b8d2-2c1d170fdf84",
    });

    console.log(`Postgres is connected`);
    console.log(`Server on port 4000`);
  } catch (error) {
    console.log(error);
    console.log(`Database is not connected`);
    console.log(`Server on port 4000`);
  }
});
