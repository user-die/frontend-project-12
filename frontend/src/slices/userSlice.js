/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(localStorage.getItem('userId')) || {},
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem('userId', JSON.stringify(action.payload));
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    removeCredentials: (state) => {
      localStorage.removeItem('userId');
      state.token = null;
      state.username = null;
    },
  },
});

export const { setCredentials, removeCredentials } = userSlice.actions;
export default userSlice.reducer;
