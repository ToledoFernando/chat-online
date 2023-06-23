import { NavLink, useNavigate } from "react-router-dom";
import MyAcountNav from "./MyAcountNav";
import { IUser } from "../../store/userStore/userStoreTypes";

function NavBarPC({ userDataLog }: { userDataLog: IUser }) {
  const navigate = useNavigate();
  return (
    <ul className="flex gap-4 items-center max-[880px]:hidden">
      <li>
        <NavLink to="/">Inicio</NavLink>
      </li>
      <li>
        <NavLink to="/about">Sobre</NavLink>
      </li>
      {userDataLog.isLogin ? (
        <div>
          <div
            onClick={() => navigate("/myaccount")}
            className="group relative cursor-pointer"
          >
            <div className="text-white group relative font-semibold bg-gradient-to-tr from-red-400 to-red-600 px-2 py-2 rounded-full">
              <MyAcountNav />
            </div>
            <div className="bg-white hidden right-5 top-8 rounded-lg shadow-xl w-40 h-max p-2 absolute group-hover:flex group-hover:flex-col group-hover:gap-2">
              <li className="hover:bg-slate-50 px-2 py-1">
                <NavLink to="/myaccount">Mi cuenta</NavLink>
              </li>
              <li className="hover:bg-slate-50 px-2 py-1">
                <NavLink to="/myaccount/settings">Configuracion</NavLink>
              </li>
              <li className="hover:bg-slate-50 px-2 py-1">
                <NavLink to="/myacount/logout">Cerrar Sesion</NavLink>
              </li>
              <hr />
              <li className="text-red-500">
                <NavLink to="/myaccount/delete-acount">Eliminar cuenta</NavLink>
              </li>
            </div>
          </div>
        </div>
      ) : (
        <>
          <li className="text-white font-semibold bg-gradient-to-tr from-red-400 to-red-600 px-2 py-1 rounded-full">
            <NavLink to="/login">Registrarse</NavLink>
          </li>
          <li className="text-white font-semibold bg-gradient-to-tr from-red-400 to-red-600 px-2 py-1 rounded-full">
            <NavLink to="/login">Iniciar Sesion</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavBarPC;
