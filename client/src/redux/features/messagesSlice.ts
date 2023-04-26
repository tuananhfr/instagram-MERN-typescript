import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import messagesService from "../../services/messagesServices";
import { ICreateMessage, IMessage, messagesState } from "../../utils/interface";

const initialState: messagesState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const createMessage = createAsyncThunk(
  "messages/create-a-message",
  async (data: ICreateMessage, thunkAPI) => {
    try {
      return await messagesService.createMessage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMessages = createAsyncThunk(
  "messages/get-messages",
  async (id: string, thunkAPI) => {
    try {
      return await messagesService.getMessages(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteMessage = createAsyncThunk(
  "messages/delete-a-message",
  async (id: string, thunkAPI) => {
    try {
      return await messagesService.deleteMessage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setCreateMessageSocket = createAsyncThunk(
  "messages/create-a-message-socket",
  async (messages: IMessage) => {
    return messages;
  }
);

export const setDeleteMessageSocket = createAsyncThunk(
  "messages/delete-a-message-socket",
  async (messages: IMessage) => {
    return messages;
  }
);

export const setDeleteConversationMessageSocket = createAsyncThunk(
  "messages/delete-a-conversation-message-socket",
  async (conversation: string) => {
    return conversation;
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data.unshift(action.payload);
          state.message = "success";
        }
      )
      .addCase(createMessage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getMessages.fulfilled,
        (state, action: PayloadAction<Array<IMessage>>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.message = "success";
        }
      )
      .addCase(getMessages.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = state.data.filter(
            (obj) => obj._id !== action.payload._id
          );
          state.message = "success";
        }
      )
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })

      .addCase(setCreateMessageSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setCreateMessageSocket.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;

          state.data!.unshift(action.payload);

          state.message = "success";
        }
      )
      .addCase(setCreateMessageSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setDeleteMessageSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setDeleteMessageSocket.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;

          state.data = state.data!.filter(
            (obj) => obj._id !== action.payload._id
          );

          state.message = "success";
        }
      )
      .addCase(setDeleteMessageSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(setDeleteConversationMessageSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        setDeleteConversationMessageSocket.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;

          state.data = state.data!.filter(
            (obj) => obj.conversation !== action.payload
          );

          state.message = "success";
        }
      )
      .addCase(setDeleteConversationMessageSocket.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default messagesSlice.reducer;
