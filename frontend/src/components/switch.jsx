/* eslint-disable */
import { useState } from "react";
import Chat from "./pages/chat";
import Login from "./pages/login";
import MyContext from "./MyContext";

function Switch(props) {
  const [login, setLogin] = useState("notLogin");
  const [nickname, setNickname] = useState();
  switch (login) {
    case "login": {
      return (
        <MyContext.Provider value={{ login, setLogin, nickname, setNickname }}>
          <Chat theme={props.theme} changeTheme={props.changeTheme} />
        </MyContext.Provider>
      );
    }

    case "notLogin": {
      return (
        <MyContext.Provider value={{ login, setLogin, nickname, setNickname }}>
          <Login theme={props.theme} changeTheme={props.changeTheme} />
        </MyContext.Provider>
      );
    }
    default: {
      return false;
    }
  }
}

export default Switch;
