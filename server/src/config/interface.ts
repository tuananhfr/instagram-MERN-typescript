import { Document } from "mongoose";
import { Request } from "express";

export interface IDecodedToken {
  id?: string;
  iat: number;
  exp: number;
}
export interface IUser extends Document {
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
  faceBookId: string;
  followers: Array<IUser>;
  following: Array<IUser>;
  saved: Array<IUser>;
  token: string;
  isPasswordMatched: (enteredPassword: string) => Promise<boolean>;
  createPasswordResetToken: () => Promise<string>;
}

export interface IPost extends Document {
  content: string;
  images: Array<string>;
  likes: Array<IUser>;
  comments: Array<IComment>;
  user: string;
}
export interface INotification extends Document {
  id: Object;
  user: IUser;
  recipients: Array<IUser>;
  images: string;
  url: string;

  content: string;
  isRead: boolean;
}

export interface IMessages extends Document {
  conversation: IConversation;
  sender: IUser;
  recipient: IUser;
  text: string;
  media: Array<string>;
  call: Object;
}

export interface IConversation extends Document {
  recipients: Array<IUser>;
  isRead: boolean;
  lastMessages: string;
}

export interface IComment extends Document {
  content: string;
  tag: IUser;
  reply: IComment;
  likes: Array<IUser>;
  user: IUser;
  postId: IPost;
}
export interface IReqAuth extends Request {
  user?: IUser;
}
export interface IDecodedToken {
  id?: string;
  user?: IUser;
  iat: number;
  exp: number;
}

export interface ISocket {
  id: string;
  socketId: string;
  online: Array<string>;
  caller?: string | null;
}
export interface ISendEmail {
  to: string;

  subject: string;
  html: string;
}
