import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import uploadImgService from "../../services/uploadImgServices";
import { uploadImg, uploadImgState } from "../../utils/interface";

const initialState: uploadImgState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadImgAvatar = createAsyncThunk(
  "upload/upload-images-avatar",
  async (data: File[], thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadImgService.uploadImgAvatar(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadImgPost = createAsyncThunk(
  "upload/upload-images-post",
  async (data: File[], thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadImgService.uploadImgPost(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadImgMessages = createAsyncThunk(
  "upload/upload-images-messages",
  async (data: File[], thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadImgService.uploadImgMessages(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteImgAvatar = createAsyncThunk(
  "upload/delete-images-avatar",
  async (id: string, thunkAPI) => {
    try {
      return await uploadImgService.deleteImgAvatar(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteImgPost = createAsyncThunk(
  "upload/delete-images-post",
  async (id: string, thunkAPI) => {
    try {
      return await uploadImgService.deleteImgPost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteImgMessages = createAsyncThunk(
  "upload/delete-images-messages",
  async (id: string, thunkAPI) => {
    try {
      return await uploadImgService.deleteImgMessages(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadImgSlice = createSlice({
  name: "upload",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImgAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        uploadImgAvatar.fulfilled,
        (state, action: PayloadAction<Array<uploadImg>>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.images = action.payload;
          state.message = "success";
        }
      )
      .addCase(uploadImgAvatar.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(uploadImgPost.pending, (state) => {
        state.isLoading = true;
        state.message = "upload/upload-images-post pedding";
      })
      .addCase(
        uploadImgPost.fulfilled,
        (state, action: PayloadAction<Array<uploadImg>>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.images = action.payload;
          state.message = "upload/upload-images-post success";
        }
      )
      .addCase(uploadImgPost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(uploadImgMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        uploadImgMessages.fulfilled,
        (state, action: PayloadAction<Array<uploadImg>>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.images = action.payload;
          state.message = "success";
        }
      )
      .addCase(uploadImgMessages.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(deleteImgAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteImgAvatar.fulfilled,
        (state, action: PayloadAction<uploadImg>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.images = state.images.filter(
            (img) => img.public_id !== action.payload.public_id
          );
          state.message = "success";
        }
      )
      .addCase(deleteImgAvatar.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(deleteImgPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteImgPost.fulfilled,
        (state, action: PayloadAction<uploadImg>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.images = [];
          state.message = "success";
        }
      )
      .addCase(deleteImgPost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(deleteImgMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteImgMessages.fulfilled,
        (state, action: PayloadAction<uploadImg>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.images = [];

          state.message = "success";
        }
      )
      .addCase(deleteImgMessages.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default uploadImgSlice.reducer;
