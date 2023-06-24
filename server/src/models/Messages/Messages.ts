import { Sequelize, DataTypes } from "sequelize";
import { IMessageModel } from "./MessagesTypes";

export default (database: Sequelize) => {
  database.define<IMessageModel>("messages", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    msg_content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isFile: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    timestamp: {
      type: DataTypes.INTEGER,
    },
    view: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
