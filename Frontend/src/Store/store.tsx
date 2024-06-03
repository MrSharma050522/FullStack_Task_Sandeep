import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure the auth reducer is included here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
