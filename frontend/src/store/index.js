import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import channelsReducer from "./channelsSlice";
import messagesReducer from "./messageSlice";
import loginReducer from "./loginSlice";

const rootReducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  login: loginReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      //{ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],},
    }),
});

export const persistor = persistStore(store);

export default store;
