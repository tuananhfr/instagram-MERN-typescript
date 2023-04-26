import mongoose from "mongoose";

import { INotification } from "../config/interface";
const notificationSchema = new mongoose.Schema(
  {
    id: mongoose.Types.ObjectId,
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    images: String,
    url: String,

    content: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<INotification>(
  "notification",
  notificationSchema
);
