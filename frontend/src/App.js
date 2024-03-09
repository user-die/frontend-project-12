/* eslint-disable */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, ErrorBoundary } from "@rollbar/react";

import NotFound from "./components/pages/notFound";
import Registration from "./components/pages/registration";
import Switch from "./components/switch";
import Chat from "./components/pages/chat";

const rollbarConfig = {
  accessToken: "a2a306803a5a4cdda9549f650046b346",
  environment: "testenv",
};

function TestError() {
  const a = null;
  return a.hello();
}

function App() {
  const body = document.querySelector("body");
  body.className = "h-100";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<Switch />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
