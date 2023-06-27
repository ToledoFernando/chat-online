export interface IUserChat {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

interface IMessageChat {
  id: string;
  view: boolean;
  user: IUserChat;
  msg: string;
}

export interface IChatCard {
  id: string;
  userTo: IUserChat;
  lastMessage: IMessageChat;
}
