import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IFormLogin, ILoginError } from "./LoginType";
import userStore from "../../store/userStore/userStore";
import { toast, ToastContentProps } from "react-toastify";
import { socket } from "../../App";

const initialValue = {
  email: "",
  password: "",
};

function LoginForm() {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormLogin>(initialValue);
  const [formError, setFormError] = useState<ILoginError>(initialValue);

  const navigate = useNavigate();

  const userData = userStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormError = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(formData.email)) {
      setFormError({ ...formError, email: "Ingrese un email valido" });
      return true;
    }
    if (formData.password.length == 0) {
      setFormError({
        ...formError,
        email: "",
        password: "Ingrese una contraseña valida",
      });
      return true;
    }
    setFormError(initialValue);
    return false;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = isFormError();
    if (error) return;
    toast.promise(
      new Promise(async (resolve, reject) => {
        const result = await userData.loginUser(formData);
        if (result.error != null) {
          return reject(result);
        }
        userData.setCookieUser(result.response.user);
        setFormData(initialValue);
        socket.emit("user-connected", result.response.user.id);
        return resolve(result.response);
      }),
      {
        pending: "Porfavor espere....",
        success: {
          render(props: ToastContentProps<unknown | any>): any {
            return props.data.msg;
          },
        },
        error: {
          render(props: ToastContentProps<unknown | any>): any {
            if (props.data.status == 404)
              return (
                <div>
                  Sesion iniciada en otro dispositivo.{" "}
                  {toast.warning("¿Cerrar la otra Sesion?", {
                    position: toast.POSITION.TOP_RIGHT,
                    closeButton: (
                      <button
                        className="font-bold"
                        onClick={() =>
                          socket.emit(
                            "user-change-conection",
                            props.data.error.userID
                          )
                        }
                      >
                        Cerrar
                      </button>
                    ),
                  })}
                </div>
              );
            else {
              return props.data.error;
            }
          },
        },
      }
    );
  };

  useEffect(() => {
    if (userData.isLogin) navigate("/");
  }, [userData.isLogin]);

  return (
    <div className="w-6/12 max-xl:w-7/12 max-lg:w-8/12 max-md:w-full h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white h-max flex bottomToTop flex-col gap-4 justify-around shadow-lg rounded-lg px-8 shadow-zinc-400 py-10 pt-14 w-10/12"
      >
        <div className="mb-4 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            value={formData.email}
            className="outline-none border-b-2"
            placeholder="Email"
          />
          <label className="text-sm text-red-500">{formError.email}</label>
        </div>
        <div className="flex flex-col gap-2">
          <label>Contraseña</label>
          <input
            type={viewPassword ? "text" : "password"}
            onChange={handleChange}
            value={formData.password}
            name="password"
            className="border-b-2 outline-none"
            placeholder="Contraseña"
          />
          <label className="text-sm text-red-500">{formError.password}</label>
          <div>
            <input
              type="checkbox"
              checked={viewPassword}
              onChange={() => setViewPassword(!viewPassword)}
              name="viewPassword"
              id=""
            />{" "}
            <label>Ver contraseña</label>
          </div>
        </div>
        <div className="text-center pt-5">
          <button className="bg-gradient-to-br from-red-400 to-red-600 disabled:to-red-200 disabled:from-red-300 disabled:cursor-no-drop text-white px-8 py-2 rounded-full">
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
