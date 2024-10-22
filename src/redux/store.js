import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "./usersSlice";

const persisterConfig = {
  key: "root",
  version: 1,
  storage,
};

const routeReducer = combineReducers({
  user: userSlice,
  product: productSlice,
  users: usersSlice,
  orders: orderSlice,
});
const persistedReducer = persistReducer(persisterConfig, routeReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persister = persistStore(store);
