import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InfoFaceBook, infoFaceBookState } from "../../utils/interface";

const initialState: infoFaceBookState = {
  data: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const setInfoFaceBook = createAsyncThunk(
  "infoFb/set-infoFb",
  async (data: InfoFaceBook) => {
    return data;
  }
);

const infoFaceBookSlice = createSlice({
  name: "info-facebook",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setInfoFaceBook.fulfilled,
      (state, action: PayloadAction<InfoFaceBook>) => {
        state.data = action.payload;
      }
    );
  },
});

export default infoFaceBookSlice.reducer;
