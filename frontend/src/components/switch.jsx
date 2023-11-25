import { useState } from 'react';
import Chat from './pages/chat';
import Login from './pages/login';
import MyContext from './MyContext';
/* eslint-disable */

function Switch() {
  const [login, setLogin] = useState('notLogin');
  const [nickname, setNickname] = useState();
  switch (login) {
    case 'login': {
      return (
        <MyContext.Provider value={{ login, setLogin, nickname, setNickname }}>
          <Chat />
        </MyContext.Provider>
      );
    }

    case 'notLogin': {
      return (
        <MyContext.Provider value={{ login, setLogin, nickname, setNickname }}>
          <Login />
        </MyContext.Provider>
      );
    }
    default: {
      return false;
    }
  }
};

export default Switch;
