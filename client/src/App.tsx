import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyPage from "./pages/Verify/VerifyPage";
import userStore from "./store/userStore/userStore";
import RoutesWeb from "./pages/PagesUsers/RoutesWeb";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import webStore from "./store/webStore/webStore";

export const socket = io(import.meta.env.VITE_API_URL);

function App() {
  const navigate = useNavigate();
  const userData = userStore((state) => state);
  const webData = webStore((state) => state);

  useEffect(() => {
    userData.checkUserLogin();

    socket.on("user-conected-chane", () => {
      userData.clearCookies();
      navigate("/login");
      toast.info("Se detecto otro inicio de Sesion...", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    socket.on("user-conected-chane-apply", (data) =>
      userData.setCookieUser(data)
    );
  }, []);

  useEffect(() => {
    if (userData.id) {
      socket.on("new-user-connected", (data) =>
        webData.newUserConnected(data, userData.id as string)
      );
      socket.on("new-user-disconnected", (data) =>
        webData.newUserDisconnected(data, userData.id as string)
      );
    }
  }, [userData.id]);

  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sigup" element={<Registro />} />
        <Route path="/verify/:code" element={<VerifyPage />} />
        <Route path="/web/*" element={<RoutesWeb />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
