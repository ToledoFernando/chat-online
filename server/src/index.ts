import express from "express";
import { database } from "./db/pgdb";
import { mongoConn } from "./db/mongodb";
import cors from "cors";
import { Roles, RolesId } from "./models/Roles/RolesTypes";
import route from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(route);

app.listen(4000, async () => {
  try {
    const mongoDB = await mongoConn();
    console.log(mongoDB);
    await database.sync({ force: true });

    await database.models.rol.bulkCreate([
      { id: RolesId.ADMIN, name: Roles.ADMIN },
      { id: RolesId.USER, name: Roles.USER },
      { id: RolesId.BANNED, name: Roles.BANNED },
    ]);

    console.log(`Postgres is connected`);
    console.log(`Server on port 4000`);
  } catch (error) {
    console.log(error);
    console.log(`Database is not connected`);
    console.log(`Server on port 4000`);
  }
});
