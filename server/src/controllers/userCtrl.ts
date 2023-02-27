import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { IReqAuth } from "../config/interface";
import validateMongoDbId from "../utils/validateMongoDbId";

const searchUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");

      res.json({ users });
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await User.findOne({ username: req.params.username })
        .select("-password")
        .populate("followers following", "-password");

      if (!data) res.status(400).json({ msg: "User does not exist." });

      res.json(data);
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

const checkUser = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const data = await User.findOne({ username: req.params.username })
        .select("-password")
        .populate("followers following", "-password");

      if (!data) res.status(400).json({ msg: "User does not exist." });

      res.json(data);
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

const checkEmail = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const data = await User.findOne({ email: req.params.email })
        .select("-password")
        .populate("followers following", "-password");
      console.log(data);
      if (!data) res.status(400).json({ msg: "User does not exist." });

      res.json(data);
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

const followUser = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const user = await User.find({
        _id: req.params.id,
        followers: req.user!._id,
      });
      if (user.length > 0)
        res.status(500).json({ msg: "You followed this user." });

      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user!._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await User.findOneAndUpdate(
        { _id: req.user!._id },
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);
const unfollowUser = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user!._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await User.findOneAndUpdate(
        { _id: req.user!._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

const suggestionsUser = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    // try {
    //   const id = req.user!._id;
    //   validateMongoDbId(id);
    //   const newArr = [...req.user!.following, id];
    //   const num = req.query.num || 10;
    //   console.log(newArr);
    //   const users = await User.aggregate([
    //     { $match: { _id: { $nin: newArr } } },
    //     { $sample: { size: Number(num) } },
    //     {
    //       $lookup: {
    //         from: "users",
    //         localField: "followers",
    //         foreignField: "_id",
    //         as: "followers",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "users",
    //         localField: "following",
    //         foreignField: "_id",
    //         as: "following",
    //       },
    //     },
    //   ]).project({ password: 0 });
    //   res.json({
    //     users,
    //     result: users.length,
    //   });
    // } catch (err: any) {
    //   res.status(500).json({ msg: err.message });
    // }
  }
);
export {
  searchUser,
  getUser,
  checkUser,
  checkEmail,
  followUser,
  unfollowUser,
  suggestionsUser,
};
