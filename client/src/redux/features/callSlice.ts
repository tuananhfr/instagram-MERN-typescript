import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICall, callState } from "../../utils/interface";

const initialState: callState = {
  data: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createCall = createAsyncThunk(
  "call/create-call",
  async (data: ICall) => {
    return data;
  }
);

export const setOnline = createAsyncThunk(
  "online/set-online",
  async (id: string[]) => {
    return id;
  }
);

const callSlice = createSlice({
  name: "online",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createCall.fulfilled,
      (state, action: PayloadAction<ICall>) => {
        state.data = action.payload;
      }
    );
  },
});

export default callSlice.reducer;
