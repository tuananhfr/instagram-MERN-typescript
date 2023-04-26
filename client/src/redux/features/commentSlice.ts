import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import commentService from "../../services/commentServices";
import {
  IComment,
  commentState,
  commentUpdate,
  Comment,
} from "../../utils/interface";

const initialState: commentState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createComment = createAsyncThunk(
  "comment/create",
  async (data: Comment, thunkAPI) => {
    try {
      return await commentService.createComment(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comment/like-a-comment",
  async (id: string, thunkAPI) => {
    try {
      return await commentService.likeComment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unLikeComment = createAsyncThunk(
  "comment/unlike-a-comment",
  async (id: string, thunkAPI) => {
    try {
      return await commentService.unLikeComment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "post/update-a-comment",
  async (data: commentUpdate, thunkAPI) => {
    try {
      return await commentService.updateComment(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete-a-comment",
  async (id: string, thunkAPI) => {
    try {
      return await commentService.deleteComment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/get-comments",
  async (_, thunkAPI) => {
    try {
      return await commentService.getComments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCommentsByPost = createAsyncThunk(
  "comment/get-comments-a-post",
  async (id: string, thunkAPI) => {
    try {
      return await commentService.getCommentsByPost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setCreateCommentSocket = createAsyncThunk(
  "comment/create-comment-socket",
  async (comment: IComment) => {
    return comment;
  }
);
export const setGetCommentSocket = createAsyncThunk(
  "comment/get-comment-socket",
  async (comment: IComment) => {
    return comment;
  }
);
export const setDeleteCommentSocket = createAsyncThunk(
  "comment/delete-comment-socket",
  async (comment: IComment) => {
    return comment;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data!.push(action.payload);

          state.message = "success";
        }
      )
      .addCase(createComment.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getComments.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;

          state.message = "success";
        }
      )
      .addCase(getComments.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(getCommentsByPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCommentsByPost.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;

          state.message = "success";
        }
      )
      .addCase(getCommentsByPost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(likeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        likeComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data!.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, likes: action.payload.likes };
            } else {
              return item;
            }
          });
          state.message = "success";
        }
      )
      .addCase(likeComment.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(unLikeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        unLikeComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data!.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, likes: action.payload.likes };
            } else {
              return item;
            }
          });
          state.message = "success";
        }
      )
      .addCase(unLikeComment.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data!.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, content: action.payload.content };
            } else {
              return item;
            }
          });

          state.message = "success";
        }
      )
      .addCase(updateComment.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data.filter(
            (item) => item._id !== action.payload._id
          );

          state.message = "success";
        }
      )
      .addCase(deleteComment.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setCreateCommentSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setCreateCommentSocket.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;

          state.data!.push(action.payload);

          state.message = "success";
        }
      )
      .addCase(setCreateCommentSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setGetCommentSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setGetCommentSocket.fulfilled,
        (state, action: PayloadAction<IComment>) => {
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
      .addCase(setGetCommentSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setDeleteCommentSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setDeleteCommentSocket.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data.filter(
            (item) => item._id !== action.payload._id
          );

          state.message = "success";
        }
      )
      .addCase(setDeleteCommentSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default commentSlice.reducer;
