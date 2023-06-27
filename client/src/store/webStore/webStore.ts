import { create } from "zustand";
import { IWebStore } from "./webStoreTypes";
import sendRequest from "../http/sendRequest";
import jscookie from "js-cookie";

const webStore = create<IWebStore>((set) => ({
  chats: [],

  searchUsers: [],

  setChats: () => {
    set({ chats: [] });
  },

  searchUserDB: async (name: string) => {
    const token = jscookie.get("user_token");
    if (!token) {
    }
    const response = await sendRequest(
      "GET",
      "/user/search_user/" + name,
      null,
      token?.toString() as string
    );

    if (response.status === 200) {
      set({ searchUsers: response.response });
    }
    return response;
  },

  clearSearch: () => set({ searchUsers: [] }),
}));

export default webStore;
