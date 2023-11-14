import Chat from "./chat";
import Login from "./login";
import { useState } from "react";
import { MyContext } from "./MyContext";

const Switch = () => {
  const [login, setLogin] = useState("notLogin");
  switch (login) {
    case "login": {
      return (
        <MyContext.Provider value={{ login, setLogin }}>
          <Chat />
        </MyContext.Provider>
      );
    }

    case "notLogin": {
      return (
        <MyContext.Provider value={{ login, setLogin }}>
          <Login />
        </MyContext.Provider>
      );
    }
  }
};

export default Switch;