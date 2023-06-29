import { useNavigate } from "react-router-dom";
import { IUser } from "../../../store/webStore/webStoreTypes";

function CardUserNew({ user }: { user: IUser }) {
  const navigate = useNavigate();

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
        onClick={() => navigate(`?ch=${user.id}`)}
        className="w-ful flex relative items-center gap-2 px-2 py-3 h-14 hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all"
      >
        <div>
          <img
            src={user.profileIMG || "/user-icon.svg"}
            alt={`${user.username} avatar`}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <p
            className="font-semibold min--z-50 break-all min-w-3/6 max-w-max  text-zinc-500"
            title={user.email}
          >
            {changeName(user.username)}
          </p>
          <p className="text-sm flex -z-50 relative items-center font-semibold text-zinc-400">
            Inicia una conversacion
          </p>
        </div>
      </div>
    </>
  );
}

export default CardUserNew;
