import { createSlice } from "@reduxjs/toolkit";

import { SocketState } from "../../utils/interface";

const initialState: SocketState = {
  data: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    setSocket: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
