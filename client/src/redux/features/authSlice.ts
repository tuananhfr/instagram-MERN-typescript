import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../services/authServices";
import userService from "../../services/userServices";
import {
  AuthState,
  IForgotPassword,
  IResetPassword,
  IUser,
  User,
  UserEdit,
  UserLogin,
  UserLoginFaceBook,
  UserRegister,
} from "../../utils/interface";

const getUserfromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
const initialState: AuthState = {
  user: getUserfromLocalStorage(),
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData: UserLogin, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loginFacebookUser = createAsyncThunk(
  "auth/login-facebook",
  async (data: UserLoginFaceBook) => {
    try {
      return await authService.loginFacebookUser(data);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.msg);
      } else {
        throw error;
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data: IResetPassword) => {
    try {
      return await authService.resetPassword(data);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.msg);
      } else {
        throw error;
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: UserRegister) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.msg);
      } else {
        throw error;
      }
    }
  }
);
export const refreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (_, thunkAPI) => {
    try {
      return await authService.refreshToken();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
export const editUser = createAsyncThunk(
  "auth/edit-user",
  async (userData: UserEdit, thunkAPI) => {
    try {
      return await authService.editUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/get-current-user",
  async (_, thunkAPI) => {
    try {
      return await authService.getCurrentUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const follow = createAsyncThunk(
  "auth/follow",
  async (id: string, thunkAPI) => {
    try {
      return await userService.followUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const unFollow = createAsyncThunk(
  "auth/unfollow",
  async (id: string, thunkAPI) => {
    try {
      return await userService.unFollowUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setFollowerUserSocket = createAsyncThunk(
  "auth/follow-auth-socket",
  async (data: IUser) => {
    return data;
  }
);
export const setUnFollowerUserSocket = createAsyncThunk(
  "auth/unfollow-auth-socket",
  async (data: IUser) => {
    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data: IForgotPassword) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.msg);
      } else {
        throw error;
      }
    }
  }
);
export const setNullUser = createAsyncThunk("auth/set-null", async () => {
  return null;
});
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";

        state.isLoading = false;
      })

      .addCase(loginFacebookUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginFacebookUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.message = "success";
        }
      )
      .addCase(loginFacebookUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";

        state.isLoading = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.message = "success";
        }
      )
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";

        state.isLoading = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user!.refreshToken = action.payload;
          state.message = "success";
        }
      )
      .addCase(refreshToken.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";

        state.isLoading = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = "success";
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.message = "success";
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(follow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(follow.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user!.following.push({
          _id: action.payload._id,
          fullname: action.payload.fullname,
          username: action.payload.username,
          avatar: action.payload.avatar,
          followers: action.payload.followers,
          following: action.payload.following,
        });
        state.message = "success";
      })
      .addCase(follow.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(unFollow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unFollow.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user!.following = state.user!.following.filter(
          (item) => item._id !== action.payload._id
        );
        state.message = "success";
      })
      .addCase(unFollow.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setFollowerUserSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setFollowerUserSocket.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user!.followers.push(action.payload);
          state.message = "success";
        }
      )
      .addCase(setFollowerUserSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setUnFollowerUserSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setUnFollowerUserSocket.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user!.followers = state.user!.followers.filter(
            (item) => item._id !== action.payload._id
          );
          state.message = "success";
        }
      )
      .addCase(setUnFollowerUserSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.message = "success";
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setNullUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setNullUser.fulfilled, (state, action: PayloadAction<null>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(setNullUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
