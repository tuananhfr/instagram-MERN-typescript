import { IDecodedToken, IReqAuth } from "./../config/interface";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/userModel";
import generateRefreshToken from "../config/refreshtoken";
import accessToken from "../config/jwtToken";

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
        const accesToken = await accessToken(newUser?._id);
        const updateuser = await User.findByIdAndUpdate(
          newUser.id,
          {
            token: accesToken,
          },
          { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",

          maxAge: 720 * 60 * 60 * 1000,
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
        const accesToken = await accessToken(findUser?._id);

        const updateuser = await User.findByIdAndUpdate(
          findUser._id,
          {
            token: accesToken,
          },
          { new: true }
        ).populate(
          "followers following",
          "avatar username fullname followers following"
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 720 * 60 * 60 * 1000,
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
        const accesToken = await accessToken(findUser?._id);

        const updateuser = await User.findByIdAndUpdate(
          findUser.id,
          {
            token: accesToken,
          },
          { new: true }
        ).populate(
          "followers following",
          "avatar username fullname followers following"
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/api/auth/refresh",

          maxAge: 720 * 60 * 60 * 1000,
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
  async (req: IReqAuth, res: Response): Promise<void> => {
    const rfToken = req.cookies.refreshToken;

    if (!rfToken) res.status(400).json({ msg: "Please login now!" });
    const decoded = <IDecodedToken>(
      jwt.verify(rfToken, process.env.REFRESH_TOKEN as any)
    );
    if (!decoded.id) res.status(400).json({ msg: "Please login now!" });

    const user = await User.findById(decoded.id);

    if (!user) res.status(400).json({ msg: "This account does not exist." });

    const access_token = accessToken(user!._id);
    await User.findOneAndUpdate(
      { _id: user!._id },
      {
        token: access_token,
      }
    );
    res.json(access_token);
  }
);

const logout = asyncHandler(
  async (req: IReqAuth, res: Response): Promise<void> => {
    try {
      const rfToken = req.cookies.refreshToken;

      res.clearCookie("refreshToken", {
        httpOnly: true,
        path: "/api/auth/refresh",

        secure: true,
        sameSite: "none",
      });

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
      Sorry to hear you’re having trouble logging into Instagram. We got a message that you forgot your password. If this was you, you can get right back into your account or reset your password now. <a href="https://instagram-mern-typescript.vercel.app/reset-password/${
        user!.token
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
