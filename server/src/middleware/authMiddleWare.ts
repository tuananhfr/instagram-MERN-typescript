import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { IDecodedToken, IReqAuth } from "../config/interface";

const authMiddleware = asyncHandler(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
      const token = authHeader.split(" ")[1];
      const decoded: any = jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN as string
      );

      const user = await User.findById(decoded?.id);
      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }
      req.user = user;
      next();
    } catch (error: any) {
      console.error(error);
      res.status(401);
      res.json({ message: error.message });
    }
  }
);

export { authMiddleware };
