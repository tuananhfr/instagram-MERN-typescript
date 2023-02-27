import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import userService from "../../services/userServices";
interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  mobile: string;
  gender: string;
  role: string;
  address: string;
  story: string;
  website: string;
  followers: Array<User>;
  following: Array<User>;
  saved: Array<User>;
  refreshToken: string;
}

interface UserState {
  data: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: UserState = {
  data: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getUser = createAsyncThunk(
  "user/get-a-user",
  async (username: string, thunkAPI) => {
    try {
      return await userService.getUser(username);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = "success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default userSlice.reducer;
