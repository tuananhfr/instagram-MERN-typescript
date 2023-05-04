import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice";
import commentReducer from "./features/commentSlice";
import suggestionUserReducer from "./features/suggestionUserSlice";
import notificationReducer from "./features/notificationSlice";
import conversationReducer from "./features/conversationSlice";
import messagesReducer from "./features/messagesSlice";
import OnlineReducer from "./features/onlineSlice";
import CallReducer from "./features/callSlice";

import uploadImgReducer from "./features/uploadImgSlice";

import GlobalStateSlice from "./features/GlobalStateSlice";
import SocketSlice from "./features/socketSlice";
import PeerSlice from "./features/peerSlice";
import infoFaceBookSlice from "./features/infoFacebookSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    upload: uploadImgReducer,
    post: postReducer,
    comment: commentReducer,
    suggestionUser: suggestionUserReducer,
    notification: notificationReducer,
    conversation: conversationReducer,
    messages: messagesReducer,
    online: OnlineReducer,
    call: CallReducer,
    infoFaceBook: infoFaceBookSlice,

    socket: SocketSlice,
    peer: PeerSlice,
    globalState: GlobalStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
