import { IReqAuth } from "./../config/interface";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/userModel";
import generateRefreshToken from "../config/refreshtoken";
import generateToken from "../config/jwtToken";

import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullname, username, email, password, faceBookId, avatar } =
        req.body;
      const newUserName = username.toLowerCase().replace(/ /g, "");
      const user_name = await User.findOne({ username: newUserName });

      if (user_name) {
        res.status(400).json({ msg: "This user name already exists." });
      }
      const user_email = await User.findOne({ email });
      if (user_email) {
        res.status(400).json({ msg: "This email already exists." });
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      } else {
        const newUser = await new User({
          avatar,
          fullname,
          username: newUserName,
          email,
          password,
          faceBookId,
        }).save();
        const refreshToken = await generateRefreshToken(newUser?._id);
        const updateuser = await User.findByIdAndUpdate(
          newUser.id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/refresh",

          maxAge: 72 * 60 * 60 * 1000,
        });
        res.json(updateuser);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

//Login with FaceBook
const loginFacebookUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { faceBookId } = req.body;
      // check if user exists or not
      const findUser = await User.findOne({ faceBookId: faceBookId }).populate(
        "followers following",
        "avatar username fullname followers following"
      );

      if (!findUser) res.status(400).json({ msg: "This user does not exist." });
      else {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
          findUser._id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        ).populate(
          "followers following",
          "avatar username fullname followers following"
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/refresh",

          maxAge: 72 * 60 * 60 * 1000,
        });
        res.json(updateuser);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

// Login a user
const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      // check if user exists or not
      const findUser = await User.findOne({ email });

      if (!findUser) throw new Error("This email does not exist.");

      if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
          findUser.id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        ).populate(
          "followers following",
          "avatar username fullname followers following"
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,

          path: "/api/refresh",

          maxAge: 72 * 60 * 60 * 1000,
        });

        res.json(updateuser);
      } else {
        throw new Error("Password is incorrect");
      }
    } catch (err: any) {
      throw new Error(err);
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

        const refreshToken = generateToken(user?._id);
        res.json({ refreshToken });
      }
    );
  }
);

const logout = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("refreshToken", { path: "/api/refresh" });
      res.json({ msg: "Logged out!" });
    } catch (err: any) {
      throw new Error(err);
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
      throw new Error(err);
    }
  }
);

const getCurrentUser = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const getCurrentUser = await User.findOne({ _id: req.user!._id });

      res.json(getCurrentUser);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const forgotPasswordToken = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ msg: "User not found with this email" });
    try {
      const resetUrl = `Hi ${user!.username},<br>
      Sorry to hear you’re having trouble logging into Instagram. We got a message that you forgot your password. If this was you, you can get right back into your account or reset your password now. <a href="http://localhost:3000/reset-password/${
        user!.refreshToken
      }">Log in as ${user!.username}</a>`;
      const data = {
        to: email,

        subject: `${user!.username}, you can get back to Instagram easily`,
        html: resetUrl,
      };
      sendEmail(data);
      res.json(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const resetPassword = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const { password, token } = req.body;

      const user = await User.findOne({
        refreshToken: token,
      }).populate(
        "followers following",
        "avatar username fullname followers following"
      );
      if (!user)
        res.status(400).json({ msg: "Token Expired, please try again later" });
      user!.password = password;

      await user!.save();
      res.json(user);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);
export {
  registerUser,
  loginUser,
  handleRefreshToken,
  logout,
  updateUser,
  getCurrentUser,
  loginFacebookUser,
  forgotPasswordToken,
  resetPassword,
};
