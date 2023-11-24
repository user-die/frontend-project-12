import Chat from "./chat";
import Login from "./login";
import { useState } from "react";
import { MyContext } from "./MyContext";

const Switch = () => {
  const [login, setLogin] = useState("notLogin");
  const [nickname, setNickname] = useState();
  switch (login) {
    case "login": {
      return (
        <MyContext.Provider value={{ login, setLogin, nickname, setNickname }}>
          <Chat />
        </MyContext.Provider>
      );
    }

    case "notLogin": {
      return (
        <MyContext.Provider value={{ login, setLogin, nickname, setNickname }}>
          <Login />
        </MyContext.Provider>
      );
    }
  }
};

export default Switch;
