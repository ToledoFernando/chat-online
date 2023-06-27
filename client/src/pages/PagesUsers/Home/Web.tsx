import AddUserChat from "../../../components/Web/newChatList/AddUserChat";
import Chat from "../../../components/Web/Chat";
import ChatList from "../../../components/Web/ChatList/ChatList";

function Web() {
  return (
    <div className="h-screen w-full pt-16 flex ">
      <ChatList />
      <Chat />
      <AddUserChat />
    </div>
  );
}

export default Web;
