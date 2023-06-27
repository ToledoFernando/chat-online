import { BiSolidSend } from "react-icons/bi";

function ChatComponent() {
  return (
    <div className="w-full h-full  flex flex-col py-2 px-2 justify-end">
      <div className="w-full h-max p-24 "></div>
      <form className="flex justify-between w-full h-10">
        <input
          type="text"
          placeholder="Escribir un mensaje"
          className="w-11/12 px-4 rounded-lg outline-none border-b-2 border-zinc-300 shadow-xl shadow-zinc-400"
        />
        <button
          className="w-max px-3 rounded-full bg-gradient-to-tr from-red-400 to-red-500 text-white"
          type="submit"
        >
          <BiSolidSend className="invert" />
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;
