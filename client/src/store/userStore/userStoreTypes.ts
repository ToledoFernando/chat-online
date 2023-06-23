export interface IUser {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  token: string | undefined;
  isLogin: boolean;

  checkUserLogin: () => IUser;
}
