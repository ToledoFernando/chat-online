import { Sequelize, DataTypes } from "sequelize";
import { IRolesModel } from "./RolesTypes";

export default (database: Sequelize) =>
  database.define<IRolesModel>("rol", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
