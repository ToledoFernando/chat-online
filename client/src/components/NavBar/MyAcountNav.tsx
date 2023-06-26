import { AiOutlineUser } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../store/userStore/userStore";

function MyAcountNav() {
  const navigate = useNavigate();
  const userData = useStore((state) => state);

  const cerrarSesion = () => {
    userData.closeSesion();
    navigate("/");
  };

  return (
    <>
      <div className="text-white group relative font-semibold bg-gradient-to-tr from-red-400 to-red-600 px-2 py-2 rounded-full">
        <AiOutlineUser className="text-white invert" size={20} />
      </div>
      <div className="bg-white duration-1000 hidden right-5 top-8 rounded-lg shadow-xl w-40 h-max p-2 absolute group-hover:flex group-hover:flex-col group-hover:gap-2">
        <li className="hover:bg-slate-50 px-2 py-1">
          <NavLink to="/myaccount">Mi cuenta</NavLink>
        </li>
        <li className="hover:bg-slate-50 px-2 py-1">
          <NavLink to="/myaccount/settings">Configuracion</NavLink>
        </li>
        <li className="hover:bg-slate-50 px-2 py-1">
          <button onClick={cerrarSesion}>Cerrar Sesion</button>
        </li>
        <hr />
        <li className="text-red-500">
          <NavLink to="/myaccount/delete-acount">Eliminar cuenta</NavLink>
        </li>
      </div>
    </>
  );
}

export default MyAcountNav;
