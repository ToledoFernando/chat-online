import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyPage from "./pages/Verify/VerifyPage";
import userStore from "./store/userStore/userStore";
import RoutesWeb from "./pages/PagesUsers/RoutesWeb";

function App() {
  const userData = userStore((state) => state);

  useEffect(() => {
    userData.checkUserLogin();
  }, []);

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
