import { BiSolidSend } from "react-icons/bi";
import { FormEventHandler, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../../../store/userStore/userStore";
import webStore from "../../../store/webStore/webStore";
import jscookie from "js-cookie";
import { toast } from "react-toastify";
import { socket } from "../../../App";
import { IMensajes } from "../../../store/webStore/webStoreTypes";

function ChatComponent() {
  const { search } = useLocation();
  const divMessages = useRef<HTMLDivElement>(null);
  const userData = useStore((state) => state);
  const webData = webStore((state) => state);
  const [chatID, setChatID] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [mensajesHistorial, setMensajesHistorial] = useState<IMensajes[]>([]);

  const sendMessage: FormEventHandler = (e) => {
    e.preventDefault();
    setMessage("");
    const currentDate = new Date();
    const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
    const dataMessage = {
      from: userData.id,
      to: webData.chatActual.id,
      msg_content: message,
      isFile: false,
      type: "text",
      ChatId: chatID,
      timestamp: unixTimestamp,
    };

    socket.emit("newMessage", dataMessage, (data: IMensajes) =>
      setMensajesHistorial([...mensajesHistorial, data])
    );
    if (divMessages.current) {
      divMessages.current.scrollTop = divMessages.current.scrollHeight;
    }
  };

  //===== Hace una peticion para saber si existe el chat o crea uno nuevo //
  useEffect(() => {
    if (userData.id) {
      console.log("Chat iniciado");
      const searchOrCreate = {
        user1: userData.id,
        user2: search.split("=")[1],
      };
      const token = jscookie.get("user_token") as string;
      webData
        .checkNewChat(searchOrCreate, token)
        .then((response) => {
          if (response.error) return toast.error(response.error);

          setChatID(response.response.id);

          if (response.response.user1.id === userData.id)
            webData.setChatActual(response.response.user2);
          else webData.setChatActual(response.response.user1);
        })
        .catch((err: unknown | any) => toast.error(err.message));
    }
  }, [search, userData.id, chatID]);

  useEffect(() => {
    if (chatID.length > 0) {
      const token = jscookie.get("user_token") as string;
      webData
        .getMessages(chatID, token)
        .then((response) => {
          setMensajesHistorial(response.response);
          if (divMessages.current) {
            divMessages.current.scrollTop = divMessages.current.scrollHeight;
          }
        })
        .catch((err: unknown | any) => toast.error(err.message));
    }
  }, [chatID]);

  socket.on("new-message", (data: IMensajes) => {
    setMensajesHistorial([...mensajesHistorial, data]);
    if (divMessages.current) {
      divMessages.current.scrollTop = divMessages.current.scrollHeight;
    }
  });

  return (
    <div className="w-full h-full  flex flex-col py-2 px-2 justify-end">
      <div
        className="w-full h-5/6 flex py-5 flex-col gap-4 overflow-y-auto"
        ref={divMessages}
      >
        {mensajesHistorial.map((mensaje) => {
          console.log(mensaje);
          return (
            <div
              key={mensaje.id}
              className={`w-full h-max px-2 py-1 mt-3 rounded-lg`}
            >
              {mensaje.user_id === userData.id ? (
                <p className="text-zinc-800">
                  <span className="bg-gradient-to-tr from-red-300 to-red-200 text-zinc-700 font-semibold p-4 rounded-xl rounded-tl-none">
                    {mensaje.msg_content}
                  </span>
                </p>
              ) : (
                <p className="text-zinc-800 text-right  ">
                  <span className="bg-gradient-to-tr from-red-300 to-red-500 text-white font-semibold p-4 rounded-xl rounded-tr-none">
                    {mensaje.msg_content}
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
      <form className="flex justify-between w-full h-10" onSubmit={sendMessage}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Escribir un mensaje"
          className="w-11/12 px-4 rounded-lg outline-none border-b-2 border-zinc-300 shadow-lg shadow-zinc-500"
        />
        <button
          className="w-max px-3 rounded-full bg-gradient-to-tr from-red-400 to-red-500 text-white"
          type="submit"
        >
          <BiSolidSend className="invert" />
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;
