import { useLocation, useNavigate } from "react-router-dom";
import ChatComponent from "./ChatComponent";
import webStore from "../../../store/webStore/webStore";

function Chat() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const webData = webStore((state) => state);

  const changeName = (name: string): string => {
    let nombres = name.split(" ");

    for (let a = 0; a < nombres.length; a++) {
      nombres[a] = nombres[a].charAt(0).toUpperCase() + nombres[a].slice(1);
    }

    return nombres.join(" ");
  };

  const getTimeUnixFormat = (timeUnix: number) => {
    const time = timeUnix * 1000;
    const fechaActual = new Date().getTime();
    const diferencia = fechaActual - time;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);

    let resultado = "";

    if (semanas > 0) {
      resultado = semanas + " semana(s)";
    } else if (dias > 0) {
      resultado = dias + " día(s)";
    } else if (horas > 0) {
      resultado = horas + " hora(s)";
    } else if (minutos > 0) {
      resultado = minutos + " minuto(s)";
    } else {
      resultado = "unos segundos";
    }
    return resultado;
  };

  // useEffect(() => {
  //   if (search) {
  //     return console.log("Se abrio un chat");
  //   }
  //   return console.log("Sin chat abierto");
  // }, [search]);

  return (
    <div className="h-full w-6/12 relative border-x-2 border-gray-300">
      {search.length > 0 ? ( // Barra de informacion de usuario
        <>
          <div className="w-full shadow-lg h-14 absolute">
            {webData.chatActual.id && (
              <div className="flex items-center gap-3 w-full pl-3 h-full">
                <img
                  src={
                    webData.chatActual.profileIMG.length == 0
                      ? "/user-icon.svg"
                      : webData.chatActual.profileIMG
                  }
                  className="w-10 h-10 rounded-full border-2 border-black"
                />
                <div className="flex flex-col">
                  <h4 className="text-sm text-zinc-600 font-semibold">{`${changeName(
                    webData.chatActual.firstName
                  )} ${changeName(webData.chatActual.lastName)}`}</h4>
                  <h5 className="text-sm text-zinc-400 font-semibold">
                    @{webData.chatActual.username}
                  </h5>
                </div>
              </div>
            )}
            <p className="absolute top-8 w-full text-center right-0 text-xs font-semibold text-zinc-400">
              {webData.chatActual.connected}{" "}
              {webData.chatActual.connected === "offline"
                ? `| ${getTimeUnixFormat(webData.chatActual.lastConnection)}`
                : null}
            </p>
            <button
              className="absolute top-2 right-2 bg-red-400 rounded-lg px-4 py-2 text-white"
              onClick={() => navigate("/web")}
            >
              Cerrar
            </button>
          </div>
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
