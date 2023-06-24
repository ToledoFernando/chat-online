import { Model } from "sequelize";

interface IUsersIdChat {
  user1: string;
  user2: string;
}

interface IChat {
  id: string;
  usersId: IUsersIdChat;
  lastMessage: string;
  lastMessageUser: string;
  msgTotal: number;
}

export interface IChatModel extends Model<IChat>, IChat {}
