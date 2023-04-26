import mongoose from "mongoose";

import { IMessages } from "../config/interface";
const messagesSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Types.ObjectId, ref: "user" },
    conversation: { type: mongoose.Types.ObjectId, ref: "conversation" },
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    text: String,
    media: String,
    call: Object,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IMessages>("messages", messagesSchema);
