import { useSelector } from 'react-redux';
import Chat from './pages/chat';
import Login from './pages/login';

function Switch() {
  const login = useSelector((state) => state.login.login);

  switch (login) {
    case true: {
      return <Chat />;
    }

    case false: {
      return <Login />;
    }
    default: {
      return false;
    }
  }
}

export default Switch;
