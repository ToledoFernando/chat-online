import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sigup" element={<Registro />} />
        <Route
          path="/verify/:code"
          element={
            <h1>
              {" "}
              <br />
              <br />
              <br /> oiawbdoaiwbdiawbidawbiodwaoibd
            </h1>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
