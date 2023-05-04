import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { IUser, User, UserState } from "../../utils/interface";

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

export const savePost = createAsyncThunk(
  "user/save-a-post",
  async (id: string, thunkAPI) => {
    try {
      return await userService.savePost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const unSavePost = createAsyncThunk(
  "user/unsave-a-post",
  async (id: string, thunkAPI) => {
    try {
      return await userService.unSavePost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setFollowerUser = createAsyncThunk(
  "user/follow-user",
  async (data: IUser) => {
    return data;
  }
);
export const setUnFollowerUser = createAsyncThunk(
  "user/unfollow-user",
  async (data: IUser) => {
    return data;
  }
);

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
        state.message = "user/get-a-user success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(savePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savePost.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = "success";
      })
      .addCase(savePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(unSavePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unSavePost.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = "success";
      })
      .addCase(unSavePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setFollowerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setFollowerUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data!.followers.push(action.payload);
          state.message = "success";
        }
      )
      .addCase(setFollowerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setUnFollowerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setUnFollowerUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data!.followers = state.data!.followers.filter(
            (item) => item !== action.payload
          );

          state.message = "success";
        }
      )
      .addCase(setUnFollowerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default userSlice.reducer;
