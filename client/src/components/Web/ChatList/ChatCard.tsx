import userStore from "../../../store/userStore/userStore";
import { IChatCard } from "./ChatCardTypes";
import { useNavigate } from "react-router-dom";
import { BsCheck, BsCheck2All } from "react-icons/bs";

function ChatCard({ chatCard }: { chatCard: IChatCard }) {
  const navigate = useNavigate();
  const userData = userStore((state) => state);

  const changeName = (name: string): string => {
    let nombres = name.split(" ");

    for (let a = 0; a < nombres.length; a++) {
      nombres[a] = nombres[a].charAt(0).toUpperCase() + nombres[a].slice(1);
    }

    return nombres.join(" ");
  };

  return (
    <>
      <div
        onClick={() => navigate(`?ch=${chatCard.userTo.id}`)}
        className="w-ful flex relative items-center gap-2 px-2 py-3 h-14 hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all"
      >
        <div>
          <img
            src={chatCard.userTo.avatar}
            alt={`${chatCard.userTo.username} avatar`}
            className="w-10 h-10 rounded-full"
          />
        </div>
        {chatCard.lastMessage.user.email !== userData.email && // si el mensaje no es mio
        !chatCard.lastMessage.view ? ( // si el mensaje no ha sido leido
          <span className="bg-green-500 -z-10 absolute w-2 h-2 rounded-full right-2 top-2"></span>
        ) : null}
        <div>
          <p
            className="font-semibold min--z-50 break-all min-w-3/6 max-w-max  text-zinc-500"
            title={chatCard.userTo.email}
          >
            {changeName(chatCard.userTo.username)}
          </p>
          <p className="text-sm flex -z-50 relative items-center font-semibold text-zinc-400">
            {chatCard.lastMessage.view ? <BsCheck2All /> : <BsCheck />}
            {chatCard.lastMessage.msg}
          </p>
        </div>
      </div>
    </>
  );
}

export default ChatCard;
