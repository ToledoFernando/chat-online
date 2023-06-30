import { Link } from "react-router-dom";

function UserVerifyError() {
  return (
    <div className="h-full w-full flex  justify-center items-center">
      <div className="w-5/12 flex flex-col gap-5">
        <h1 className="text-5xl  w-full bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent font-black">
          Ocurrio un error <br /> al verificar su cuenta
        </h1>
        <p className="text-md text-zinc-500 font-medium">
          Recargue la pagina, si el problema persiste, contacte a soporte.
        </p>
        <span className="w-max text-white font-semibold bg-gradient-to-tr from-red-400 to-red-600 px-2 py-1 rounded-full">
          <Link to="/soport">Soporte</Link>
        </span>
      </div>
      <img className="w-4/12" src="/error-icon.svg" alt="error-logo" />
    </div>
  );
}

export default UserVerifyError;
