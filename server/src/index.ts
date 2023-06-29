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
    const mongoDB = await mongoConn();
    console.log(mongoDB);
    // await database.sync({ force: true });
    await database.sync();

    // await database.models.Rol.bulkCreate([
    //   { id: RolesId.ADMIN, name: Roles.ADMIN },
    //   { id: RolesId.USER, name: Roles.USER },
    //   { id: RolesId.BANNED, name: Roles.BANNED },
    // ]);

    console.log(`Postgres is connected`);
    console.log(`Server on port 4000`);
  } catch (error) {
    console.log(error);
    console.log(`Database is not connected`);
    console.log(`Server on port 4000`);
  }
});
