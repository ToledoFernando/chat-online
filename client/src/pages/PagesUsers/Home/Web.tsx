import AddUserChat from "../../../components/Web/newChatList/AddUserChat";
import Chat from "../../../components/Web/ChatComponent/Chat";
import ChatList from "../../../components/Web/ChatList/ChatList";
import { useEffect } from "react";
import webStore from "../../../store/webStore/webStore";
import useStore from "../../../store/userStore/userStore";
import { toast } from "react-toastify";

function Web() {
  const webData = webStore((state) => state);
  const userData = useStore((state) => state);

  useEffect(() => {
    if (userData.token) {
      webData
        .getChats(userData.token, userData.id as string)
        .then((response) => response.error && toast.error(response.error));
    }
  }, [userData.token]);
  return (
    <div className="h-screen w-full pt-16 flex ">
      <ChatList />
      <Chat />
      <AddUserChat />
    </div>
  );
}

export default Web;
