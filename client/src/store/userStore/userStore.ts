import { create } from "zustand";
import { IUser, IUserRegister } from "./userStoreTypes";
import sendRequest from "../http/sendRequest";
import jsCookie from "js-cookie";

const useStore = create<IUser>((set) => ({
  id: "",
  email: "",
  isLogin: false,
  username: "",
  token: "",

  checkUserLogin: () => {
    const user = {
      id: jsCookie.get("user_id"),
      email: jsCookie.get("user_email"),
      isLogin: !!jsCookie.get("isLogin"),
      username: jsCookie.get("user_name"),
      token: jsCookie.get("user_token"),
    } as IUser;
    set(user);
    return user;
  },
  createUser: async (data: IUserRegister) => {
    const response = await sendRequest("POST", "/user/register", data);
    return response;
  },
}));

export default useStore;
