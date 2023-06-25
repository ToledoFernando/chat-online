import { useEffect, useState } from "react";
import userStore from "../../store/userStore/userStore";
import NavBarPC from "./NavBarPC";
import NavbarMovil from "./NavbarMovil";

function NavBar() {
  const [showShadow, setShowShadow] = useState<boolean>(false);
  const [_, setScrollPosition] = useState<number>(0);

  const userDataLog = userStore((state) => state);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setShowShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full h-max bg-white dark:text-white z-50 transition-all duration-500 ${
        showShadow ? "shadow-lg" : ""
      }`}
    >
      <nav className="w-11/12 m-auto flex justify-between items-center p-4 top-0">
        <h1 className="text-3xl font-semibold">
          Chat <span className="font-semibold text-red-500">Online</span>
        </h1>
        <NavBarPC userDataLog={userDataLog} />
        <NavbarMovil userDataLog={userDataLog} />
      </nav>
    </header>
  );
}

export default NavBar;
