import mongoose from "mongoose";

import { IComment } from "../config/interface";
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    reply: { type: mongoose.Types.ObjectId, ref: "comment" },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    postId: { type: mongoose.Types.ObjectId, ref: "post" },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IComment>("comment", commentSchema);
