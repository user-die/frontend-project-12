import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollBar, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './AppRoutes.jsx';
import Modal from './components/modals/Modal.jsx';
import Toast from './components/toast/Toast.jsx';

import initI18next from './initI18next.js';
import store from './slices/store.js';
import { addMessage } from './slices/messageSlice';
import {
  removeChannel, changeChannel, addChannel, updateChannel,
} from './slices/channelSlice.js';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

const init = async () => {
  const i18Instance = await initI18next();

  const socket = io();

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    store.dispatch(changeChannel({ id: '1' }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(changeChannel(payload));
    store.dispatch(updateChannel({ id: payload.id, changes: { name: payload.name } }));
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  return (
    <RollBar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18Instance}>
            <AppRoutes />
            <Toast />
            <Modal />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollBar>
  );
};

export default init;
