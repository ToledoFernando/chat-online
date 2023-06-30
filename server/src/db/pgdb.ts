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
Messages.hasMany(Chats);
// Users.hasMany(Chats);
// users.belongsToMany(chats, { through: "chat_user" });
// chats.belongsToMany(users, { through: "chat_user" });

Chats.hasMany(Messages);
// Chats.belongsTo(Messages, {
//   foreignKey: { name: "lastMessage", defaultValue: "" },
//   as: "last_message",
// });
Chats.belongsTo(Users, { foreignKey: "userId1", as: "user1" });
Chats.belongsTo(Users, { foreignKey: "userId2", as: "user2" });
// Chats.belongsTo(Messages, { foreignKey: "lastMessage", as: "lastMessageData" });
// Chats.belongsTo(Users, { foreignKey: "userId1", as: "user1Data" });
// Chats.belongsTo(Users, { foreignKey: "userId2", as: "user2Data" });

export { database };
