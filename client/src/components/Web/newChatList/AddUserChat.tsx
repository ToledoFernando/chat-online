import { useState, FormEventHandler } from "react";
import webStore from "../../../store/webStore/webStore";
import CardUserNew from "./CardUserNew";

function AddUserChat() {
  const [userSearch, setUserSearch] = useState<string>("");

  const webData = webStore((state) => state);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (userSearch.length === 0) return webData.clearSearch();
    await webData.searchUserDB(userSearch);
  };

  return (
    <div className="h-full w-3/12">
      <div>
        <form
          onSubmit={handleSubmit}
          className="py-2 px-1 flex justify-center w-full"
        >
          <input
            type="text"
            placeholder="@username"
            onChange={(e) => setUserSearch(e.target.value)}
            value={userSearch}
            className="w-8/12 pl-2 border-b-2 outline-none"
          />
          <button className="w-3/12 bg-blue-500 text-white font-semibold">
            Buscar
          </button>
        </form>
      </div>
      {webData.searchUsers.length == 0 ? (
        <div className="flex flex-col justify-center items-center h-5/6">
          <img
            src="/user-add.svg"
            className="opacity-50 w-2/6"
            alt="user-add-logo"
          />
          <p className="text-center text-zinc-400 font-semibold">
            Busca un usuario <br />y comienza un a chatear
          </p>
        </div>
      ) : (
        webData.searchUsers.map((user, index) => (
          <CardUserNew user={user} key={index} />
        ))
      )}
    </div>
  );
}

export default AddUserChat;
