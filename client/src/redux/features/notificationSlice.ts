import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import notificationService from "../../services/notificationServices";
import {
  ICreateNotification,
  INotification,
  NotificationState,
} from "../../utils/interface";

const initialState: NotificationState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createNotification = createAsyncThunk(
  "notification/create-notification",
  async (data: ICreateNotification, thunkAPI) => {
    try {
      return await notificationService.createNotification(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNotification = createAsyncThunk(
  "notification/get-notification",
  async (_, thunkAPI) => {
    try {
      return await notificationService.getNotification();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteNotification = createAsyncThunk(
  "notification/delete-notification",
  async (id: string, thunkAPI) => {
    try {
      return await notificationService.deleteNotification(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isReadNotification = createAsyncThunk(
  "notification/is-read-notification",
  async (id: string, thunkAPI) => {
    try {
      return await notificationService.isReadNotification(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setCreateNotificationSocket = createAsyncThunk(
  "notification/create-notification-socket",
  async (notify: INotification) => {
    return notify;
  }
);

export const setDeleteNotificationSocket = createAsyncThunk(
  "notification/delete-notification-socket",
  async (notify: INotification) => {
    return notify;
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(createNotification.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(
      //     createNotification.fulfilled,
      //     (state, action: PayloadAction<INotification>) => {
      //       state.isError = false;
      //       state.isLoading = false;
      //       state.isSuccess = true;
      //       state.data!.push(action.payload);
      //       state.message = "success";
      //     }
      //   )
      //   .addCase(createNotification.rejected, (state, action) => {
      //     state.isError = true;
      //     state.isSuccess = false;
      //     state.message = action.error.message ?? "An error occurred.";
      //     state.isLoading = false;
      //   })
      .addCase(getNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getNotification.fulfilled,
        (state, action: PayloadAction<INotification[]>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.message = "success";
        }
      )
      .addCase(getNotification.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteNotification.fulfilled,
        (state, action: PayloadAction<INotification>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data.filter(
            (item) => item._id !== action.payload._id
          );
          state.message = "success";
        }
      )
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(isReadNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        isReadNotification.fulfilled,
        (state, action: PayloadAction<INotification>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data!.map((item) => {
            if (item._id === action.payload._id) {
              return action.payload;
            } else {
              return item;
            }
          });
          state.message = "success";
        }
      )
      .addCase(isReadNotification.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setCreateNotificationSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setCreateNotificationSocket.fulfilled,
        (state, action: PayloadAction<INotification>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data!.unshift(action.payload);

          state.message = "success";
        }
      )
      .addCase(setCreateNotificationSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setDeleteNotificationSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setDeleteNotificationSocket.fulfilled,
        (state, action: PayloadAction<INotification>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data.filter(
            (item) => item._id !== action.payload._id
          );

          state.message = "success";
        }
      )
      .addCase(setDeleteNotificationSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default notificationSlice.reducer;
