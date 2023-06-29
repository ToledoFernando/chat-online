export interface IUserConnected {
  id: string;
  email: string;
  isLogin: boolean;
  username: string;
  token: string;
}

export interface IMessage {
  from: string;
  to: string;
  msg_content: string;
  isFile: boolean;
  type: string;
  ChatId: string;
  timestamp: number;
}
