import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OnlineState } from "../../utils/interface";

const initialState: OnlineState = {
  data: [],
};

export const setOnlineToClient = createAsyncThunk(
  "online/set-online-to-client",
  async (id: string) => {
    return id;
  }
);
export const setOfflineToClient = createAsyncThunk(
  "online/set-offline-to-client",
  async (id: string) => {
    return id;
  }
);

export const setOnline = createAsyncThunk(
  "online/set-online",
  async (id: string[]) => {
    return id;
  }
);

const onlineSlice = createSlice({
  name: "online",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        setOnlineToClient.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.includes(action.payload)
            ? state.data
            : [...state.data, action.payload];
        }
      )
      .addCase(
        setOfflineToClient.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((obj) => obj !== action.payload);
        }
      )
      .addCase(
        setOnline.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.data = action.payload;
        }
      );
  },
});

export default onlineSlice.reducer;
