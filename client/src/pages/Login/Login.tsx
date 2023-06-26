import LoginForm from "../../components/Login/LoginForm";
import LoginLeft from "../../components/Login/LoginLeft";

function LoginRegistrer() {
  return (
    <main className="h-screen py-16 flex justify-around items-center">
      <LoginLeft />
      <LoginForm />
      <img src="/wave.svg" alt="wave" className="-z-10 absolute bottom-0" />
    </main>
  );
}

export default LoginRegistrer;
