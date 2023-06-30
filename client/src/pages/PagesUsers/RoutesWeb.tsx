import { useEffect } from "react";
import jsCoockie from "js-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
// import userStore from "../../store/userStore/userStore";
import Web from "./Home/Web";

function RoutesWeb() {
  const navigate = useNavigate();

  // const userData = userStore((state) => state);

  useEffect(() => {
    const token = jsCoockie.get("user_token");
    if (!token) navigate("/login");
    // userData
    //   .checkUserLogin()
    //   .then((response) => {
    //     if (!response || response?.status !== 200) navigate("/login");
    //   })
    //   .catch(() => {
    //     navigate("/login");
    //   }); // HACE QUE SE ACTUALICE A PAGINA Y RECIBA 2 VECES EL EVENTO DE USUARIO CONECTADO
  }, []);

  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Web />} />
          <Route path="dash" element={<h1>Dash</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default RoutesWeb;
