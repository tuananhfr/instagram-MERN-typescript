import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../services/authServices";
interface UserLogin {
  email: string;
  password: string;
}
interface UserRegister {
  email: string;
  password: string;
  username: string;
  fullname: string;
}
interface UserRegister {
  email: string;
  password: string;
  username: string;
  fullname: string;
}
interface AuthState {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  gender: string;
  mobile: string;
  address: string;
  story: string;
  website: string;
  followers: Array<User>;
  following: Array<User>;
  saved: Array<User>;
  refreshToken: string;
}
interface UserEdit {
  fullname: string;
  username: string;
  avatar: string;
  mobile: string;
  gender: string;
  address: string;
  story: string;
  website: string;
}
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

export const register = createAsyncThunk(
  "auth/register",
  async (userData: UserRegister, thunkAPI) => {
    try {
      return await authService.register(userData);
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
      });
  },
});

export default authSlice.reducer;
