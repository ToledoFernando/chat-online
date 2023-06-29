import { create } from "zustand";
import { IMensajes, IUser, IUsersChat, IWebStore } from "./webStoreTypes";
import sendRequest from "../http/sendRequest";
import jscookie from "js-cookie";

const webStore = create<IWebStore>((set) => ({
  chats: [],

  chatActual: {} as IUser,

  searchUsers: [],

  messages: [],

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

  checkNewChat: async (data: IUsersChat, token: string) => {
    const response = await sendRequest("POST", "/chats/new", data, token);
    if (response.error) return response;

    set((state) => {
      const existe = state.chats.some(function (element) {
        return element.id === response.response.id;
      });

      if (existe) return { chats: state.chats };
      else return { chats: [...state.chats, response.response] };
    });
    return response;
  },

  getChats: async (token: string) => {
    const chats = await sendRequest("GET", "/chats/", null, token);
    if (chats.error) return chats;
    set({ chats: chats.response });
    return chats;
  },
  setChatActual: (data: IUser) => {
    set({ chatActual: data });
  },

  getMessages: async (chatID: string, token: string) => {
    const messages = await sendRequest(
      "GET",
      "/chats/messages/" + chatID,
      null,
      token
    );
    if (messages.error) return messages;
    set({ messages: messages.response });
    return messages;
  },

  setNewMessage: async (msg: IMensajes) => {
    set((state) => {
      return { messages: [...state.messages, msg] };
    });
  },

  clearMessages: () => set({ messages: [] }),
}));

export default webStore;
