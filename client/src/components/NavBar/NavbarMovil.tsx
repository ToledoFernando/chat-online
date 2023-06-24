import { useState } from "react";

import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { IUser } from "../../store/userStore/userStoreTypes";

function NavbarMovil({ userDataLog }: { userDataLog: IUser }) {
  const [viewbar, setViewBar] = useState(false);

  return (
    <div className="max-[880px]:visible min-[880px]:hidden">
      <AiOutlineMenu
        size={30}
        className="cursor-pointer"
        onClick={() => setViewBar(!viewbar)}
      />
      <div
        className={`absolute top-0 ${
          viewbar ? "right-0" : "-right-full"
        } transition-all duration-500 w-60 max-[500px]:w-full px-10 bg-zinc-100 shadow-2xl h-screen`}
      >
        <div className="h-full relative">
          <GrClose
            className="absolute top-5 -left-5 cursor-pointer"
            onClick={() => setViewBar(!viewbar)}
            size={20}
          />
          <ul className="flex gap-7  flex-col items-center justify-center h-full ">
            <li>
              <NavLink onClick={() => setViewBar(false)} to="/">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setViewBar(false)} to="/about">
                Sobre
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setViewBar(false)} to="/contact">
                Contacto
              </NavLink>
            </li>
            {userDataLog.isLogin ? (
              <div className="w-full">
                <hr className="mb-3 w-full" />
                <div className="right-5 top-8 rounded-lg w-full text-center h-max p-2">
                  <li className="hover:bg-slate-50 px-2 py-2">
                    <NavLink onClick={() => setViewBar(false)} to="/myaccount">
                      Mi cuenta
                    </NavLink>
                  </li>
                  <li className="hover:bg-slate-50 px-2 py-2">
                    <NavLink
                      onClick={() => setViewBar(false)}
                      to="/myaccount/settings"
                    >
                      Configuracion
                    </NavLink>
                  </li>
                  <li className="hover:bg-slate-50 px-2 py-2 mb-5">
                    <NavLink
                      onClick={() => setViewBar(false)}
                      to="/myacount/logout"
                    >
                      Cerrar Sesion
                    </NavLink>
                  </li>
                  <hr />
                  <li className="text-transparent mt-5 w-full text-sm py-2 bg-gradient-to-tr bg-clip-text from-red-400 to-red-600  rounded-full">
                    <NavLink
                      onClick={() => setViewBar(false)}
                      to="/myaccount/delete-acount"
                      className="flex gap-2 items-center justify-center"
                    >
                      Eliminar cuenta
                    </NavLink>
                  </li>
                </div>
              </div>
            ) : (
              <>
                <li className="text-transparent font-semibold bg-gradient-to-tr bg-clip-text  from-red-400 to-red-600 px-2 py-1 rounded-full">
                  <NavLink to="/sigup">Registrarse</NavLink>
                </li>
                <li className="text-transparent font-semibold  bg-gradient-to-tr bg-clip-text from-red-400 to-red-600 px-2 py-1 rounded-full">
                  <NavLink to="/login">Iniciar Sesion</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavbarMovil;
