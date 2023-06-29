import { Sequelize, DataTypes } from "sequelize";
import { IModelUser } from "./UserAcoutnTypes";

export default (database: Sequelize) =>
  database.define<IModelUser>("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileIMG: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    verify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    connected: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "offline",
    },
    lastConnection: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    listUseLock: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    socketId: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
