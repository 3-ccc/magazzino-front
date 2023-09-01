import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import logger from "redux-logger";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import tokenStore from "./tokenStore";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  tokenStore: tokenStore,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Logger with default options
const store = configureStore({
  reducer: persistedReducer,
  //middleware: [logger],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };