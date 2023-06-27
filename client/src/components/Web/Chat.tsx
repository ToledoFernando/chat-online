import { useLocation, useNavigate } from "react-router-dom";
import ChatComponent from "./ChatList/Chat";

function Chat() {
  const navigate = useNavigate();
  const { search } = useLocation();
  console.log(search);

  // useEffect(() => {
  //   if (search) {
  //     return console.log("Se abrio un chat");
  //   }
  //   return console.log("Sin chat abierto");
  // }, [search]);

  return (
    <div className="h-full w-6/12 relative border-x-2 border-gray-300">
      {search.length > 0 ? (
        <>
          <button
            className="absolute top-2 right-2 bg-red-400 rounded-lg px-4 py-2 text-white"
            onClick={() => navigate("/web")}
          >
            Cerrar
          </button>
          <ChatComponent />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <img src="/chat.svg" alt="chat-logo" className="opacity-50 w-2/6" />
          <p className="text-xl text-zinc-500 font-semibold">
            Inicia una conversacion con tus amigos
          </p>
        </div>
      )}
    </div>
  );
}

export default Chat;
