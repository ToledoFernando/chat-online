import { Sequelize, DataTypes } from "sequelize";
import { IChatModel } from "./ChatsTypes";

export default (database: Sequelize) => {
  database.define<IChatModel>("chats", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usersId: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    msgTotal: {
      type: DataTypes.INTEGER,
    },
    lastMessage: {
      type: DataTypes.STRING,
    },
    lastMessageUser: {
      type: DataTypes.STRING,
    },
  });
};
