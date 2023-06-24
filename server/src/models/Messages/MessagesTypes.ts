import { Model } from "sequelize";

interface IMessage {
  id: string;
  msg_content: string;
  isFile: boolean;
  type: string;
  user_id: string;
  timestamp: number;
  view: boolean;
}

export interface IMessageModel extends Model<IMessage>, IMessage {}
