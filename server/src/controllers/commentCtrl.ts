import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel";
import Post from "../models/postModel";

import { IReqAuth } from "../config/interface";

const createComment = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const { postId, content, tag, reply } = req.body;
      const post = await Post.findById(postId);

      if (!post) res.status(400).json({ msg: "This post does not exist." });
      if (reply) {
        const cm = await Comment.findById(reply);
        if (!cm) res.status(400).json({ msg: "This comment does not exist." });
      }
      const newComment = new Comment({
        user: req.user!._id,
        content,
        tag,
        reply,
        postId,
      });

      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await (
        await newComment.populate(
          "user",
          "avatar username fullname followers following"
        )
      ).save();
      res.json(newComment);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const getComments = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const posts = await Post.find({
        user: [...req.user!.following, req.user!._id],
      });
      const postIds = posts.map((post) => post._id); // Get an array of post IDs
      const comments = await Comment.find({
        postId: { $in: postIds },
      }).populate("user", "avatar username fullname followers following");

      res.json(comments);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const getCommentsByPost = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const comment = await Comment.find({
        postId: req.params.id,
      }).populate("user", "avatar username fullname followers following");

      res.json(comment);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const updateComment = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const { id, content } = req.body;
      const comment = await Comment.findOneAndUpdate(
        { _id: id },
        {
          content,
        },
        { new: true }
      ).populate("user", "avatar username fullname followers following");

      res.json(comment);

      res.json(comment);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const deleteComment = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.id,
        user: req.user!._id,
      }).populate("user", "avatar username fullname followers following");
      res.json(comment);
      await Post.findOneAndUpdate(
        { _id: comment!.postId },
        {
          $pull: { comments: req.params.id },
        }
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const likeComment = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const comment = await Comment.find({
        _id: req.params.id,
        likes: req.user!._id,
      });
      if (comment.length > 0)
        res.status(400).json({ msg: "You liked this post." });

      const likeComment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user!._id },
        },
        { new: true }
      );

      res.json(likeComment);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const unLikeComment = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const comment = await Comment.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $pull: { likes: req.user!._id },
        },
        { new: true }
      );

      res.json(comment);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

export {
  createComment,
  getComments,
  likeComment,
  unLikeComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
};
