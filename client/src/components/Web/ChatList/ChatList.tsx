import { useEffect, useState } from "react";
import webStore from "../../../store/webStore/webStore";
// import { IChatCard } from "./ChatCardTypes";
import ChatCard from "./ChatCard";
import { IChat } from "../../../store/webStore/webStoreTypes";

function ChatList() {
  const webData = webStore((state) => state);
  const [chats, setChats] = useState<IChat[]>([]);

  useEffect(() => {
    setChats(webData.chats);
  }, []);

  useEffect(() => {
    setChats(webData.chats);
  }, [webData.chats]);

  return chats.length === 0 ? (
    <div className="w-3/12 h-full flex flex-col -z-50 justify-center items-center ">
      <img
        src="/messages-logo.svg"
        className="opacity-50 w-2/6"
        alt="message-logo"
      />
      <p className="text-center text-zinc-400 font-semibold">
        Sin mensajes <br /> inicia un chat con algun usuario
      </p>
    </div>
  ) : (
    <div className="w-3/12 relative h-full py-5 overflow-y-scroll">
      <div className="w-full h-max">
        {chats.map((chat, index) => {
          return <ChatCard chatCard={chat} key={index} />;
        })}
      </div>
    </div>
  );
}

export default ChatList;
