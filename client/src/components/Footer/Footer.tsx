import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-zinc-900  h-max pt-4 flex flex-col justify-between">
      <div className="flex justify-around mb-6 pt-6 items-center max-lg:flex-row max-lg:justify-around max-[860px]:flex-col">
        <div className="w-3/12 max-[860px]:w-full max-[860px]:text-center">
          <h6 className="text-3xl font-semibold text-slate-200 mb-7 max-[860px]:text-4xl ">
            Chat <span className="font-semibold text-red-400">online</span>
          </h6>
          <p className="text-sm text-left text-zinc-400 max-[860px]:m-auto  max-[860px]:text-center ">
            Una aplicacion de chat creada para ser facil de usar.
          </p>
          <div className="flex items-center gap-10 ml-3 max-[860px]:justify-center">
            <FaFacebook size={30} className="invert mt-5 cursor-pointer" />
            <MdEmail size={34} className="invert mt-5 cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-around w-5/12 max-[860px]:w-full">
          <ul>
            <li className="text-slate-400 text-sm my-8">
              <Link to="/about">Sobre nosotros</Link>
            </li>
            <li className="text-slate-400 text-sm my-8">
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
          <ul>
            <li className="text-slate-400 text-sm my-8">
              <Link to="/login">Comienza a chatear</Link>
            </li>
            <li className="text-slate-400 text-sm my-8">
              <Link to="/pricing">Precios</Link>
            </li>
          </ul>
        </div>
        <ul>
          <li className="text-slate-400">correodecontacto@gmail.com</li>
          <li className="flex items-center gap-2 mt-3">
            <BsWhatsapp className="invert" size={20} />{" "}
            <p className="text-slate-300">+54 9 3878124578</p>
          </li>
        </ul>
      </div>
      <div className="bg-neutral-950">
        <p className="px-5 py-2 text-zinc-500 text-sm">
          © {new Date().getFullYear()} chat.online - Argentina
        </p>
      </div>
    </footer>
  );
}

export default Footer;
