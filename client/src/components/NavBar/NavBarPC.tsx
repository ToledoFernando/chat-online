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
            <MyAcountNav />
          </div>
        </div>
      ) : (
        <>
          <li className="text-white font-semibold bg-gradient-to-tr from-red-400 to-red-600 px-2 py-1 rounded-full">
            <NavLink to="/sigup">Registrarse</NavLink>
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
