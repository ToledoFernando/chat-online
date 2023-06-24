import RegistroForm from "../../components/Registro/RegistroForm";
import RegistroRight from "../../components/Registro/RegistroRight";

function Registro() {
  return (
    <main className="h-screen pt-20 relative flex w-full justify-between">
      <RegistroForm />
      <RegistroRight />
      <img src="/wave.svg" alt="wave" className="-z-10 absolute bottom-0" />
    </main>
  );
}

export default Registro;
