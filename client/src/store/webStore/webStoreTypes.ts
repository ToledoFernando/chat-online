import { IHttpResponse } from "../http/sendRequestType";

export interface IWebStore {
  chats: [];

  searchUsers: [];

  setChats: () => void;

  searchUserDB: (name: string) => Promise<IHttpResponse>;

  clearSearch: () => void;
}
