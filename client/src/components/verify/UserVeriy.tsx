import { Link } from "react-router-dom";

function UserVerify() {
  return (
    <div className="h-full w-full flex  justify-center items-center">
      <div className="w-4/12 flex flex-col gap-10">
        <h1 className="text-5xl  w-full bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent font-black">
          Cuenta Verificada <br /> con exito
        </h1>
        <p className="text-md text-zinc-500 font-medium">
          Ya puedes iniciar sesion en su cuenta
        </p>
        <span className="w-max text-white font-semibold bg-gradient-to-tr from-red-400 to-red-600 px-2 py-1 rounded-full">
          <Link to="/login">Iniciar Sesion</Link>
        </span>
      </div>
      <img className="w-4/12" src="/ok.svg" alt="verified" />
    </div>
  );
}

export default UserVerify;
