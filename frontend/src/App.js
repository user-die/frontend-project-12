/* eslint-disable */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./components/pages/notFound";
import Registration from "./components/pages/registration";
import Switch from "./components/switch";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const body = document.querySelector("body");
  body.setAttribute("data-bs-theme", theme);

  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
      body.setAttribute("data-bs-theme", "dark");
    } else {
      setTheme("light");
      body.setAttribute("data-bs-theme", "light");
    }
  }

  body.className = "h-100";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/404"
          element={<NotFound theme={theme} changeTheme={changeTheme} />}
        />
        <Route
          path="/"
          element={<Switch theme={theme} changeTheme={changeTheme} />}
        />
        <Route
          path="/signup"
          element={<Registration theme={theme} changeTheme={changeTheme} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
