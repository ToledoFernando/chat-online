import { Model } from "sequelize";

export interface IUserModel {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profileIMG: string;
  verify: boolean;
  connected: string;
  lastConnection: number;
  banned: boolean;
  listUseLock: string[];
  rolId?: string;
  socketId: string;
}
export interface IModelUser extends Model<IUserModel>, IUserModel {}
