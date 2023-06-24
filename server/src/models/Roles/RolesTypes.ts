import { Model } from "sequelize";

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
  BANNED = "BANNED",
}

export enum RolesId {
  ADMIN = "69b091b1-a5bf-4a96-b0c7-d2b669c03c6e",
  USER = "915e22b1-3fa2-4804-b8d2-2c1d170fdf84",
  BANNED = "dc60e02d-1607-468f-a9cc-f09bbfaaf900",
}

interface IRolAttributes {
  id: string;
  name: Roles;
}

export interface IRolesModel extends Model<IRolAttributes>, IRolAttributes {}
