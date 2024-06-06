import React, { useMemo } from 'react';
import axios from 'axios';

import routes from '../routes';
import getAuthHeader from '../utilities/getAuthHeader';
import ApiContext from './ApiContext';

const ApiProvider = ({ children }) => {
  const createChannel = async (channel) => {
    const res = await axios.post(routes.channelsPath(), channel, { headers: getAuthHeader() });
    return res.data;
  };

  const removeChannel = async (id) => {
    await axios.delete(routes.idChannelPath(id), { headers: getAuthHeader() });
  };

  const renameChannel = async (id, channel) => {
    await axios.patch(routes.idChannelPath(id), channel, { headers: getAuthHeader() });
  };

  const loginUser = async (data) => {
    const res = await axios.post(routes.loginPath(), data);
    return res.data;
  };

  const signupUser = async (data) => {
    const res = await axios.post(routes.signupPath(), data);
    return res.data;
  };

  const postMessage = async (message) => {
    await axios.post(routes.messagesPath(), message, { headers: getAuthHeader() });
  };

  const value = useMemo(() => ({
    createChannel,
    removeChannel,
    renameChannel,
    loginUser,
    signupUser,
    postMessage,
  }), []);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
