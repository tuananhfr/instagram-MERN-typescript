import mongoose from "mongoose";

import { IConversation } from "../config/interface";
const conversationSchema = new mongoose.Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    isRead: { type: Boolean, default: false },
    lastMessages: String,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IConversation>(
  "conversation",
  conversationSchema
);
