import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from './components/pages/notFound';
import Registration from './components/pages/registration';
import Switch from './components/switch';

function App() {
  const authorization = {
    isLogin: 'notLogin',
  };

  const body = document.querySelector('body');
  body.className = 'h-100 bg-light';
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<Switch />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
