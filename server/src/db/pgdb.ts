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

const { rol, users, chats, messages } = database.models;

rol.hasMany(users);
chats.hasMany(messages);
users.belongsToMany(chats, { through: "chat_user" });
chats.belongsToMany(users, { through: "chat_user" });

export { database };
