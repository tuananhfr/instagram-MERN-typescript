import { createSlice } from "@reduxjs/toolkit";
import { GlobalState, IComment } from "../../utils/interface";

const initialState: GlobalState = {
  isSearchGlobalState: false,
  isUploadGlobalState: false,
  isNotificationGlobalState: false,

  isPostGlobalState: false,
  isDeletePostGlobalState: false,

  isEditPostGlobalState: false,
  isEditCommentGlobalState: false,
  isCreateConversationGlobalState: false,
  isDeleteConversationGlobalState: false,
  isCallGlobalState: false,
  isFollowerGlobalState: false,
  isFollowingGlobalState: false,

  postModalId: null, // Initialize postId to null
  commentReply: null,
  conversationModal: null,
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setIsSearchGlobalState: (state) => {
      state.isSearchGlobalState = !state.isSearchGlobalState;
    },
    setIsUploadGlobalState: (state) => {
      state.isUploadGlobalState = !state.isUploadGlobalState;
    },
    setIsNotificationGlobalState: (state) => {
      state.isNotificationGlobalState = !state.isNotificationGlobalState;
    },
    setIsPostGlobalState: (state) => {
      state.isPostGlobalState = !state.isPostGlobalState;
    },
    setIsDeletePostGlobalState: (state) => {
      state.isDeletePostGlobalState = !state.isDeletePostGlobalState;
    },

    setIsEditPostGlobalState: (state) => {
      state.isEditPostGlobalState = !state.isEditPostGlobalState;
    },
    setIsEditCommentGlobalState: (state) => {
      state.isEditCommentGlobalState = !state.isEditCommentGlobalState;
    },
    setIsCreateConversationGlobalState: (state) => {
      state.isCreateConversationGlobalState =
        !state.isCreateConversationGlobalState;
    },
    setIsDeleteConversationGlobalState: (state) => {
      state.isDeleteConversationGlobalState =
        !state.isDeleteConversationGlobalState;
    },
    setCallGlobalState: (state) => {
      state.isCallGlobalState = !state.isCallGlobalState;
    },
    setIsFollowerGlobalState: (state) => {
      state.isFollowerGlobalState = !state.isFollowerGlobalState;
    },
    setIsFollowingGlobalState: (state) => {
      state.isFollowingGlobalState = !state.isFollowingGlobalState;
    },

    setPostModalId: (state, action) => {
      // Define the setPostId action
      state.postModalId = action.payload;
    },
    setCommentReply: (state, action) => {
      // Define the setPostId action
      state.commentReply = action.payload;
    },
    setConversationModalId: (state, action) => {
      // Define the setPostId action
      state.conversationModal = action.payload;
    },
  },
});

export const { setIsSearchGlobalState } = globalStateSlice.actions;
export const { setIsUploadGlobalState } = globalStateSlice.actions;
export const { setIsNotificationGlobalState } = globalStateSlice.actions;
export const { setIsPostGlobalState } = globalStateSlice.actions;
export const { setIsDeletePostGlobalState } = globalStateSlice.actions;

export const { setIsEditPostGlobalState } = globalStateSlice.actions;
export const { setIsEditCommentGlobalState } = globalStateSlice.actions;
export const { setIsCreateConversationGlobalState } = globalStateSlice.actions;
export const { setIsDeleteConversationGlobalState } = globalStateSlice.actions;
export const { setCallGlobalState } = globalStateSlice.actions;
export const { setIsFollowerGlobalState } = globalStateSlice.actions;
export const { setIsFollowingGlobalState } = globalStateSlice.actions;

export const { setPostModalId } = globalStateSlice.actions;
export const { setCommentReply } = globalStateSlice.actions;
export const { setConversationModalId } = globalStateSlice.actions;

export default globalStateSlice.reducer;
