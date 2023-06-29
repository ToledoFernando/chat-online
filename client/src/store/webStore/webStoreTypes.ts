import { IHttpResponse } from "../http/sendRequestType";

export interface IChat {
  id: string;
  lastMessage: any;
  lastMessageUser: any;
  msgTotal: number;
  createdAt: string;
  updatedAt: string;
  userId1: string;
  userId2: string;
  user1: IUser;
  user2: IUser;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileIMG: string;
  verify: boolean;
  connected: string;
  lastConnection: number;
  banned: boolean;
  socketId: string;
  RolId: string;
}

export interface IUsersChat {
  user1: string;
  user2: string;
}

export interface IMensajes {
  id: string;
  msg_content: string;
  isFile: boolean;
  type: string;
  user_id: string;
  timestamp: number;
  view: boolean;
  ChatId: string;
}

export interface IWebStore {
  chats: IChat[];

  chatActual: IUser;

  searchUsers: IUser[];

  setChats: () => void;

  searchUserDB: (name: string) => Promise<IHttpResponse>;

  checkNewChat: (data: IUsersChat, token: string) => Promise<IHttpResponse>;

  clearSearch: () => void;

  getChats: (token: string, myID: string) => Promise<IHttpResponse>;

  setChatActual: (userData: IUser) => void;

  getMessages: (chatID: string, token: string) => Promise<IHttpResponse>;
}
