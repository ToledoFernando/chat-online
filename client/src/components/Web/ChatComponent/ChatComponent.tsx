import { BiSolidSend } from "react-icons/bi";
import { FormEventHandler, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../../../store/userStore/userStore";
import webStore from "../../../store/webStore/webStore";
import jscookie from "js-cookie";
import { toast } from "react-toastify";
import { socket } from "../../../App";
import { IMensajes, Meses } from "../../../store/webStore/webStoreTypes";

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
      msg_content: message.replace(/\n/g, "<br />"),
      isFile: false,
      type: "text",
      ChatId: chatID,
      timestamp: unixTimestamp,
    };

    socket.emit("newMessage", dataMessage, (data: IMensajes) => {
      webData.setNewMessage(data);
      if (divMessages.current) {
        divMessages.current.scrollTop = divMessages.current.scrollHeight;
      }
    });
  };

  //===== Hace una peticion para saber si existe el chat o crea uno nuevo //
  useEffect(() => {
    if (userData.id) {
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

  //evento para traer los nuevos mensajes y los mensajes anterires
  useEffect(() => {
    if (chatID.length > 0) {
      //Escuchar evento de nuevo mensajes
      socket.on("new-message", (data: IMensajes) => {
        webData.setNewMessage(data);
      });

      //Traer mensajes anteriores
      const token = jscookie.get("user_token") as string;
      webData
        .getMessages(chatID, token)
        .then((response) => {
          setMensajesHistorial(response.response);
        })
        .catch((err: unknown | any) => toast.error(err.message));
    }

    return webData.clearMessages();
  }, [chatID]);

  //Cada vez que llega un mensaje nuevo, el scroll baja automaticamente
  useEffect(() => {
    if (divMessages.current) {
      divMessages.current.scrollTop = divMessages.current.scrollHeight;
    }
  }, [webData.messages]);

  const getTimestamp = (time: number) => {
    //fecha del mensaje y fecha actual
    const currentDate = new Date();
    const date = new Date(time * 1000);

    //Dia y mes actual
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    //dia y mes del mensaje
    const month = date.getMonth();
    const day = date.getDate();

    //hora y minuto del mensaje
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (month < currentMonth || (month === currentMonth && day < currentDay)) {
      console.log("La fecha es menor a la fecha actual.");
      return `${day}/${Meses[month]} - ${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;
    } else {
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    }
  };

  return (
    <div className="w-full h-full  flex flex-col py-2 px-2 justify-end">
      <div
        className="w-full h-5/6 flex py-5 flex-col gap-4 overflow-y-auto"
        ref={divMessages}
      >
        {webData.messages.map((mensaje, index) => {
          return (
            <div
              key={index}
              className="w-full relative h-max px-2 py-1 mt-3 rounded-lg"
            >
              {mensaje.user_id === userData.id ? (
                <p className="text-zinc-800">
                  <span className="bg-gradient-to-tr w-max max-w-md h-max block from-red-300 to-red-200 text-zinc-700 font-semibold p-4 rounded-xl rounded-tl-none">
                    <label className="absolute -bottom-2 left-4 text-[8px] text-zinc-500">
                      {getTimestamp(mensaje.timestamp)}
                    </label>
                    <label
                      className="text-zinc-700 font-semibold"
                      dangerouslySetInnerHTML={{ __html: mensaje.msg_content }}
                    ></label>
                  </span>
                </p>
              ) : (
                <p className="text-zinc-800 text-right flex justify-end">
                  <span className="bg-gradient-to-tr w-max max-w-md h-max block from-red-300 to-red-500 text-white font-semibold p-4 rounded-xl rounded-tr-none">
                    <label className="absolute -bottom-2 right-4 text-[8px] text-zinc-500">
                      {getTimestamp(mensaje.timestamp)}
                    </label>
                    <label
                      className="text-white font-semibold"
                      dangerouslySetInnerHTML={{ __html: mensaje.msg_content }}
                    ></label>
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
      <form
        className="flex justify-between items-center w-full max-h-32 min-h-10"
        onSubmit={sendMessage}
      >
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Escribir un mensaje"
          className="w-11/12 px-4 rounded-lg max-h-32 min-h-32 h-full resize-none outline-none border-b-2 border-zinc-300 shadow-lg shadow-zinc-500"
        ></textarea>
        <button
          className="w-max px-3 h-10 rounded-full bg-gradient-to-tr from-red-400 to-red-500 text-white"
          type="submit"
        >
          <BiSolidSend className="invert" />
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;
