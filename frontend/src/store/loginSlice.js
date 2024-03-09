import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "messages",
  initialState: {
    login: false,
    nickname: "",
    token: "",
    theme: "",
    lng: "ru",
  },
  reducers: {
    toggleLogin: (state) => {
      state.login = !state.login;
    },

    setNickname: (state, action) => {
      state.nickname = action.payload;
    },

    resetNickname: (state) => {
      state.nickname = "";
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleLogin, setNickname, resetNickname, toggleTheme } =
  loginSlice.actions;

export default loginSlice.reducer;
