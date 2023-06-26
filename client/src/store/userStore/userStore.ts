import { create } from "zustand";
import {
  ICookieUser,
  IUser,
  IUserLogin,
  IUserRegister,
} from "./userStoreTypes";
import sendRequest from "../http/sendRequest";
import jsCookie from "js-cookie";

// Funcion para insertar cookies
function insertCookies(data: ICookieUser) {
  const userStatus = {
    id: data.id,
    email: data.email,
    isLogin: true,
    username: data.username,
    token: data.token,
  };
  jsCookie.set("user_id", data.id as string);
  jsCookie.set("user_email", data.email as string);
  jsCookie.set("isLogin", data.isLogin.toString() as string);
  jsCookie.set("user_name", data.username as string);
  jsCookie.set("user_token", data.token as string);

  return userStatus;
}

// Funcion para eliminar cookies
function deleteCookies() {
  const initialUser = {
    id: "",
    email: "",
    isLogin: false,
    username: "",
    token: "",
  };
  jsCookie.remove("user_id");
  jsCookie.remove("user_email");
  jsCookie.remove("isLogin");
  jsCookie.remove("user_name");
  jsCookie.remove("user_token");

  return initialUser;
}

const useStore = create<IUser>((set) => ({
  id: "",
  email: "",
  isLogin: false,
  username: "",
  token: "",

  checkUserLogin: async () => {
    const token = jsCookie.get("user_token");
    if (token) {
      const response = await sendRequest(
        "GET",
        "/user/check-acount",
        null,
        token as string
      );
      console.log(response);
      if (response.error) {
        const userStatus = deleteCookies();
        set(userStatus);
        return;
      }

      deleteCookies();

      const userStatus = insertCookies(response.response.user);
      set(userStatus);

      return response;
    } else {
      const userStatus = deleteCookies();
      set(userStatus);
    }
  },

  closeSesion: () => {
    const userStatus = deleteCookies();
    set(userStatus);
  },

  createUser: async (data: IUserRegister) => {
    const response = await sendRequest("POST", "/user/register", data);
    return response;
  },

  verifyUser: async (code: string) => {
    console.log(code);
    const response = await sendRequest("GET", "/user/verify/" + code);
    return response;
  },

  loginUser: async (data: IUserLogin) => {
    const response = await sendRequest("POST", "/user/login", data);
    return response;
  },

  setCookieUser: (data: ICookieUser) => {
    const user = {
      id: data.id,
      email: data.email,
      isLogin: data.isLogin,
      username: data.username,
      token: data.token,
    };

    jsCookie.set("user_id", data.id as string);
    jsCookie.set("user_email", data.email as string);
    jsCookie.set("isLogin", data.isLogin.toString() as string);
    jsCookie.set("user_name", data.username as string);
    jsCookie.set("user_token", data.token as string);

    set(user);
    return user;
  },
}));

export default useStore;
