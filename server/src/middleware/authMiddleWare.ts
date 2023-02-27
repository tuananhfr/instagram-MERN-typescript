import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authMiddleware = asyncHandler(
  async (req: Request | any, res: Response, next: NextFunction) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded: any = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET as string
          );
          const user = await User.findById(decoded?.id);
          req.user = user;
          next();
        }
      } catch (error) {
        throw new Error("Not Authorized token expired, Please Login again");
      }
    } else {
      throw new Error(" There is no token attached to header");
    }
  }
);

export { authMiddleware };
