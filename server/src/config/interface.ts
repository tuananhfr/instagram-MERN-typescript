import { Document } from "mongoose";
import { Request } from "express";

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
  followers: Array<IUser>;
  following: Array<IUser>;
  saved: Array<IUser>;
  refresh: string;
  isPasswordMatched: (enteredPassword: string) => Promise<boolean>;
  createPasswordResetToken: () => Promise<string>;
}

export interface IPost extends Document {
  content: string;
  images: Array<string>;
  likes: Array<IUser>;
  comments: Array<IComment>;
  user: Array<IUser>;
}
export interface INotify extends Document {
  id: Object;
  user: IUser;
  recipients: Array<Object>;
  url: string;
  text: string;
  content: string;
  image: string;
  isRead: boolean;
}

export interface IMessage extends Document {
  conversation: IConversation;
  sender: IUser;
  recipient: IUser;
  text: string;
  media: Array<string>;
  call: Object;
}

export interface IConversation extends Document {
  recipients: IUser;
  text: string;
  media: Array<string>;
  call: Object;
}

export interface IComment extends Document {
  content: string;
  tag: Object;
  reply: Object;
  likes: Array<IUser>;
  user: IUser;
  postId: Object;
  postUserId: Object;
}
export interface IReqAuth extends Request {
  user?: IUser;
}
