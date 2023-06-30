import { Sequelize, DataTypes } from "sequelize";
import { IChatModel } from "./ChatsTypes";

export default (database: Sequelize) => {
  database.define<IChatModel>("Chats", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lastMessage: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Messages",
        key: "id",
      },
    },
    msgTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
// lastMessageUser: {
//   type: DataTypes.STRING,
// },
