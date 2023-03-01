import { IReqAuth } from "./../config/interface";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/userModel";
import generateRefreshToken from "../config/refreshtoken";
import generateToken from "../config/jwtToken";

import jwt from "jsonwebtoken";

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullname, username, email, password } = req.body;
      const newUserName = username.toLowerCase().replace(/ /g, "");
      const user_name = await User.findOne({ username: newUserName });

      if (user_name) {
        throw new Error("This user name already exists.");
      }
      const user_email = await User.findOne({ email });
      if (user_email) {
        throw new Error("This email already exists.");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      } else {
        const newUser = await new User({
          fullname,
          username: newUserName,
          email,
          password,
        }).save();

        res.json(newUser);
      }
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

// Login a user
const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      // check if user exists or not
      const findUser = await User.findOne({ email }).populate(
        "followers following",
        "avatar username fullname followers following"
      );

      if (!findUser) throw new Error("This email does not exist.");

      if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
          findUser.id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });
        res.json(updateuser);
      } else {
        throw new Error("Password is incorrect");
      }
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

// handle refresh token

const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user)
      throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as any,
      (err: any, decoded: any) => {
        if (err || user.id !== decoded.id) {
          throw new Error("There is something wrong with refresh token");
        }

        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
      }
    );
  }
);

const logout = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    //   const cookie = req.cookies;
    //   if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    //   const refreshToken = cookie.refreshToken;
    //   const user = await User.findOne({ refreshToken });
    //   if (!user) {
    //     res.clearCookie("refreshToken", {
    //       httpOnly: true,
    //       secure: true,
    //     });
    //     res.status(204); // forbidden
    //   }
    //   await User.findOneAndUpdate(refreshToken, {
    //     refreshToken: "",
    //   });
    //   res.clearCookie("refreshToken", {
    //     httpOnly: true,
    //     secure: true,
    //   });
    //   res.sendStatus(204); // forbidden
    try {
      res.clearCookie("refreshToken", { path: "/api/refresh" });
      res.json({ msg: "Logged out!" });
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

const updateUser = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const {
        username,
        avatar,
        fullname,
        mobile,
        address,
        story,
        website,
        gender,
      } = req.body;
      const user_name = await User.findOne({ username: username });
      if (user_name) throw new Error("This user name already exists.");
      const updateUser = await User.findOneAndUpdate(
        { _id: req.user!._id },
        {
          username,
          avatar,
          fullname,
          mobile,
          address,
          story,
          website,
          gender,
        },
        { new: true }
      );

      res.json(updateUser);
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }
);

export { registerUser, loginUser, handleRefreshToken, logout, updateUser };
