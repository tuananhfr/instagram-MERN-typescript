import { Socket } from "socket.io-client";
import { Peer } from "peerjs";
/* Auth-User */
export interface IResetPassword {
  password: string;
  token: string;
}
export interface IForgotPassword {
  email: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserLoginFaceBook {
  faceBookId: string;
}
export interface UserEdit {
  fullname: string;
  username: string;
  avatar: string;
  mobile: string;
  gender: string;
  address: string;
  story: string;
  website: string;
}

export interface UserRegister {
  email: string;
  password: string;
  username: string;
  fullname: string;
  faceBookId?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
export interface UserEdit {
  fullname: string;
  username: string;
  avatar: string;
  mobile: string;
  gender: string;
  address: string;
  story: string;
  website: string;
}
export interface IUserInfo {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
}
export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  followers: Array<string>;
  following: Array<string>;
}

export interface User {
  _id: string;
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
  followers: Array<IUser>;
  following: Array<IUser>;
  post: Array<string>;
  saved: Array<string>;
  token: string;
}

export interface UserState {
  data: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
/* suggestionUserState */

export interface suggestionUserState {
  data: User[] | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

/* Upload Img */

export interface uploadImg {
  url: string;
  asset_id: string;
  public_id: string;
}

export interface uploadImgState {
  images: uploadImg[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

/* Post  */

export interface Post {
  content?: string;
  images: string[];
}
export interface postUpdate {
  content: string;
  id: string;
}

export interface IPost {
  user: User;
  content: string;
  images: string[];
  likes: string[];
  comments: string[];
  _id: string;
  createdAt: string;
}
export interface ICreatePost {
  content: string;
  images: string[];
}
export interface postState {
  data: IPost[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
/* Comment  */
export interface Comment {
  content: string;
  tag?: string[];
  reply?: string;
  postId: string;
}
export interface commentUpdate {
  content: string;
  id: string;
}

export interface IComment {
  _id: string;
  postId: string;
  content: string;
  tag: string[];
  reply: string;
  likes: string[];
  user: User;
  createdAt: string;
}

export interface commentState {
  data: IComment[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
/* Notification  */
export interface ICreateNotification {
  id: string;
  recipients: Array<string>;
  images: string;
  url: string;

  content: string;
  user: string;
}

export interface INotification {
  _id: string;
  id: string;
  user: User;
  recipients: Array<string>;
  images: string;
  url: string;
  content: string;
  isRead: boolean;
}

export interface NotificationState {
  data: INotification[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
/* Conversation  */
export interface INewMessageConversation {
  _id: string;
  recipients: User[];
  lastMessages: string;
  updatedAt: string;
}
export interface IConversation {
  _id: string;
  recipients: User[];
  isRead: boolean;
  lastMessages: string;
  updatedAt: string;
}

export interface conversationState {
  data: IConversation[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
/* Messages  */
export interface Call {
  start: string;
  end: string;
  video: boolean;
  audio: boolean;
}
export interface ICreateMessage {
  conversation: string;
  sender: string;
  call?: Call;
  recipient: string;
  text?: string;
  media?: string;
}
export interface IMessage {
  _id: string;
  conversation: string;
  sender: User;
  call: Call;
  recipient: User;
  text: string;
  media: string;
  createdAt: string;
}

export interface messagesState {
  data: IMessage[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

/* Online  */

export interface IOnline {
  id: string;
  socketId: string;
}
export interface OnlineState {
  data: string[];
}
/* Call  */

export interface ICall {
  sender: IUserInfo;
  recipient: IUserInfo;
  video: boolean;
  audio: boolean;
  conversation: string;
  peerId?: string;
}

export interface callState {
  data: ICall | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

/* GlobalState  */

export interface GlobalState {
  isSearchGlobalState: boolean;
  isUploadGlobalState: boolean;
  isNotificationGlobalState: boolean;
  isPostGlobalState: boolean;
  isDeletePostGlobalState: boolean;

  isEditPostGlobalState: boolean;
  isEditCommentGlobalState: boolean;

  isCreateConversationGlobalState: boolean;
  isDeleteConversationGlobalState: boolean;
  isCallGlobalState: boolean;
  isFollowerGlobalState: boolean;
  isFollowingGlobalState: boolean;

  postModalId: string | null; // Add postId to the GlobalState interface
  commentReply: IComment | null;
  conversationModal: string | null;
}

/* infoFacebook  */

export interface Picture {
  data: {
    height: number;
    width: number;
    is_silhouette: boolean;
    url: string;
  };
}
export interface InfoFaceBook {
  id: string;
  name: string;
  picture: Picture;
}

export interface infoFaceBookState {
  data: InfoFaceBook | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
/* Socket  */

export interface SocketState {
  data: Socket | null;
}

/* Peer  */

export interface PeerState {
  data: Peer | null;
}
/* HelmetProps  */

export interface HelmetProps {
  title: string;
  children: React.ReactNode;
}
/* FaceBookLoginProps  */

export interface FaceBookLoginProps {
  title: string;
}

/* CommentProps  */

export interface CommentProps {
  cmt: IComment;
}
/* PostProps  */

export interface PostProps {
  post: IPost;
}
/* PostProps  */

export interface BoxChatProps {
  id: string;
}
/* IInfoProfile  */

export interface IInfoProfile {
  username: string;
}
