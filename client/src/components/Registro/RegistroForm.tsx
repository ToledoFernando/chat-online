import { FormEventHandler, useState } from "react";
import { IUserForm, IUserFormError, IUserFormState } from "./RegistroTypes";
import { IUserRegister } from "../../store/userStore/userStoreTypes";
import useStore from "../../store/userStore/userStore";
// import { IHttpResponse } from "../../store/http/sendRequestType";
import { ToastContentProps, toast } from "react-toastify";

const initialValues = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  username: "",
  verifyPassword: "",
} as IUserForm;

const initialValuesError = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  username: "",
  verifyPassword: "",
} as IUserFormError;

function RegistroForm() {
  const [registerform, setRegisterForm] = useState<IUserFormState | IUserForm>(
    initialValues
  );
  const [formError, setFormError] = useState<boolean>(true);
  const [errorFormMSG, setErrorFormMSG] =
    useState<IUserFormError>(initialValuesError);
  const userData = useStore((state) => state);

  const checkEmail = (): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(registerform.email);
  };

  const checkLength = (dataRegister: IUserFormState) => {
    if (dataRegister.firstname.length < 3) {
      return setFormError(true);
    }
    if (dataRegister.lastname.length < 3) {
      return setFormError(true);
    }
    if (dataRegister.username.length < 3) {
      return setFormError(true);
    }
    if (dataRegister.email.length < 3) {
      return setFormError(true);
    }
    if (dataRegister.password.length < 3) {
      return setFormError(true);
    }
    if (dataRegister.password !== dataRegister.verifyPassword) {
      return setFormError(true);
    }
    setFormError(false);
  };

  const handleChange: FormEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    setRegisterForm({ ...registerform, [name]: value });
    checkLength({ ...registerform, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const check = checkEmail();
    if (!check) {
      setErrorFormMSG({ ...errorFormMSG, email: "El email no es válido" });
      return;
    } else {
      setErrorFormMSG({ ...errorFormMSG, email: "" });
      const data = {
        firstName: registerform.firstname,
        lastName: registerform.lastname,
        username: registerform.username,
        email: registerform.email,
        password: registerform.password,
      } as IUserRegister;

      toast.promise(
        new Promise(async (resolve, reject) => {
          const result = await userData.createUser(data);
          if (result.error != null) {
            return reject(result.error);
          }
          return resolve(result.data);
        }),
        {
          pending: "Porfavor espere....",
          success: {
            render(props: ToastContentProps<unknown>): any {
              return props.data;
            },
          },
          error: {
            render(props: ToastContentProps<unknown>): any {
              return props.data;
            },
          },
        }
      );
    }
  };

  return (
    <div className="w-6/12 h-full flex items-center justify-center">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="bg-white h-max flex bottomToTop flex-col gap-4 justify-around shadow-lg rounded-lg px-8 shadow-zinc-400 py-10 pt-14 w-10/12"
      >
        <div className="mb-4 flex gap-4">
          <div className="w-11/12 flex flex-col">
            <label>Nombre</label>
            <input
              type="text"
              name="firstname"
              className="outline-none w-full border-b-2"
              placeholder="Nombre"
            />
          </div>
          <div className="w-full flex flex-col">
            <label>Apellido</label>
            <input
              type="text"
              name="lastname"
              className="outline-none border-b-2"
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="outline-none border-b-2"
            placeholder="Username"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="outline-none border-b-2"
            placeholder="Email"
          />
          <label>{errorFormMSG.email}</label>
        </div>
        <div className="flex flex-col gap-4">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="border-b-2"
            placeholder="Contraseña"
          />
          <label>Repetir contraseña</label>
          <input
            type="password"
            name="verifyPassword"
            className="border-b-2"
            placeholder="Contraseña"
          />
        </div>
        <div className="text-center pt-5">
          <button
            disabled={formError}
            className="bg-gradient-to-br from-red-400 to-red-600 disabled:to-red-200 disabled:from-red-300 disabled:cursor-no-drop text-white px-8 py-2 rounded-full"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistroForm;
