import { Sequelize, DataTypes } from "sequelize";
import { IRolesModel } from "./RolesTypes";

export default (database: Sequelize) =>
  database.define<IRolesModel>("Rol", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
