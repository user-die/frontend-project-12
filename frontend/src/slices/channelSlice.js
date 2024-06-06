/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';
import getAuthHeader from '../utilities/getAuthHeader.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.channelsPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  activeChannelId: '1',
  status: 'idle',
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    changeChannel: (state, action) => {
      const { id } = action.payload;
      state.activeChannelId = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload);
        state.status = 'loaded';
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export const {
  addChannel, removeChannel, updateChannel, changeChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
