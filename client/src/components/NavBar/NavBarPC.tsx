import { NavLink } from "react-router-dom";
import MyAcountNav from "./MyAcountNav";
import { IUser } from "../../store/userStore/userStoreTypes";
import useStore from "../../store/userStore/userStore";

function NavBarPC({ userDataLog }: { userDataLog: IUser }) {
  const userData = useStore((state) => state);

  return (
    <ul className="flex gap-4 items-center max-[880px]:hidden">
      <li>
        <NavLink to="/">Inicio</NavLink>
      </li>
      <li>
        <NavLink to="/about">Sobre</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contacto</NavLink>
      </li>
      {userData.isLogin && (
        <li>
          <NavLink to="/web">Web</NavLink>
        </li>
      )}
      {userDataLog.isLogin ? (
        <div>
          <div className="group relative cursor-pointer">
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
