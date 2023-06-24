export interface IUser {
  id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  token: string | undefined;
  isLogin: boolean;

  checkUserLogin: () => IUser;
}
