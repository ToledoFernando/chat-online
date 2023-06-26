import { IHttpResponse } from "../http/sendRequestType";

export interface IUserRegister {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ICookieUser {
  id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  token: string | undefined;
  isLogin: boolean;
}

export interface IUser extends ICookieUser {
  checkUserLogin: () => Promise<IHttpResponse | undefined>;

  closeSesion: () => void;

  createUser: (user: IUserRegister) => Promise<IHttpResponse>;

  verifyUser: (code: string) => Promise<IHttpResponse>;

  loginUser: (data: IUserLogin) => Promise<IHttpResponse>;

  setCookieUser: (data: ICookieUser) => void;
}
