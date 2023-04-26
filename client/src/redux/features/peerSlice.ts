import { createSlice } from "@reduxjs/toolkit";
import { PeerState } from "../../utils/interface";

const initialState: PeerState = {
  data: null,
};

const socketSlice = createSlice({
  name: "peer",
  initialState: initialState,
  reducers: {
    setPeer: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPeer } = socketSlice.actions;

export default socketSlice.reducer;
