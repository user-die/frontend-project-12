/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, type: '' },
  reducers: {
    setModalShow: (state, action) => {
      const { type } = action.payload;
      state.isOpen = true;
      state.type = type;
    },
    removeModal: (state) => {
      state.isOpen = false;
      state.type = '';
    },
  },
});

export const { setModalShow, removeModal } = modalSlice.actions;
export default modalSlice.reducer;
