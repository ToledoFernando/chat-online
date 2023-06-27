export interface IUserSearch {
  id: string;
  firstName: string;
  username: string;
  email: string;
  profileIMG: string;
  verify: boolean;
  connected: string;
  lastConnection: number;
  banned: boolean;
  listUseLock: any[];
  createdAt: string;
  updatedAt: string;
  rolId: string;
}
