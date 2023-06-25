import { IHttpResponse } from "../http/sendRequestType";

export interface IUserRegister {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  token: string | undefined;
  isLogin: boolean;

  checkUserLogin: () => IUser;

  createUser: (user: IUserRegister) => Promise<IHttpResponse>;
}
