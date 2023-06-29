import { Model } from "sequelize";

interface IChat {
  id: string;
  lastMessage: string;
  lastMessageUser: string;
  msgTotal: number;
}

export interface IChatModel extends Model<IChat>, IChat {}
