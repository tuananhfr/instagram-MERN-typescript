import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";

import GlobalStateSlice from "./features/GlobalStateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,

    globalState: GlobalStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
