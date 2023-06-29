export interface IUserSearch {
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
