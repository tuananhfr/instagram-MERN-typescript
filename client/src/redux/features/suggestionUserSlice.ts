import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { User, suggestionUserState } from "../../utils/interface";

const initialState: suggestionUserState = {
  data: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getSuggestionUser = createAsyncThunk(
  "suggestion/get-suggestion-user",
  async (_, thunkAPI) => {
    try {
      return await userService.getSuggestionUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const followSuggestionUser = createAsyncThunk(
  "suggestion/follow-a-suggestion-user",
  async (id: string, thunkAPI) => {
    try {
      return await userService.followUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const unFollowSuggestionUser = createAsyncThunk(
  "suggestion/unfollow-a-suggestion-user",

  async (id: string, thunkAPI) => {
    try {
      return await userService.unFollowUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const suggestionUserSlice = createSlice({
  name: "suggestion",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestionUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSuggestionUser.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.message = "success";
        }
      )
      .addCase(getSuggestionUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(followSuggestionUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        followSuggestionUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data!.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, followers: action.payload.followers };
            } else {
              return item;
            }
          });
          state.message = "success";
        }
      )
      .addCase(followSuggestionUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(unFollowSuggestionUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        unFollowSuggestionUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data!.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, followers: action.payload.followers };
            } else {
              return item;
            }
          });
          state.message = "success";
        }
      )
      .addCase(unFollowSuggestionUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default suggestionUserSlice.reducer;
