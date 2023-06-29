import { Sequelize } from "sequelize";
import defineModelRoles from "../models/Roles/Roles";
import defineModelUsers from "../models/Users/UserAcount";
import defineModelChats from "../models/Chats/Chats";
import defineModelMessages from "../models/Messages/Messages";
import { POSTGRESQL } from "../config/config";

const database = new Sequelize(POSTGRESQL as string, {
  logging: false,
  native: false,
});

defineModelRoles(database);
defineModelUsers(database);
defineModelChats(database);
defineModelMessages(database);

const { Rol, Users, Chats, Messages } = database.models;

Rol.hasMany(Users);
Chats.hasMany(Messages);
// users.belongsToMany(chats, { through: "chat_user" });
// chats.belongsToMany(users, { through: "chat_user" });
Chats.belongsTo(Users, { foreignKey: "userId1", as: "user1" });
Chats.belongsTo(Users, { foreignKey: "userId2", as: "user2" });

export { database };
