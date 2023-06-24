function RegistroForm() {
  return (
    <div className="w-5/12 h-full flex items-center justify-center">
      <form className="bg-white flex bottomToTop flex-col gap-4 justify-around shadow-lg rounded-lg px-8 h-4/6 shadow-zinc-400 py-10 pt-14 w-10/12">
        <div className="mb-4 flex flex-col">
          <label>Nombre de usuario</label>
          <input
            type="text"
            className="outline-none border-b-2"
            placeholder="Username"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            className="outline-none border-b-2"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label>Contraseña</label>
          <input
            type="password"
            className="border-b-2"
            placeholder="Contraseña"
          />
          <label>Repetir contraseña</label>
          <input
            type="password"
            className="border-b-2"
            placeholder="Contraseña"
          />
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

export default RegistroForm;
