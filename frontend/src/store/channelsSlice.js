import { createSlice } from "@reduxjs/toolkit";

const channelsSlice = createSlice({
  name: "channels",
  initialState: {
    channels: [],
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },

    addChannel: (state, action) => {
      state.channels.push({
        id: action.payload.id,
        name: action.payload.name,
        removable: action.payload.removable,
      });
    },

    removeChannel: (state, action) => {
      state.channels = state.channels.filter((el) => el.id !== action.payload);
    },

    renameChannel: (state, action) => {
      const copyChannels = [...state.channels];
      copyChannels.splice(
        copyChannels.indexOf(
          copyChannels.filter((el) => el.id === action.payload.id)
        ),
        1,
        { id: action.payload.id, name: action.payload.name, removable: true }
      );

      state.channels = copyChannels;
    },
  },
});

export const { setChannels, addChannel, removeChannel, renameChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
