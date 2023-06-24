import { create } from "zustand";
import { IUser } from "./userStoreTypes";
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
}));

export default useStore;
