import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";

import { cloudinaryUploadImg } from "../utils/cloudinary";

const uploadImages = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const uploader = (path: string) => cloudinaryUploadImg(path);
      const urls = [];
      const files = req.files as Express.Multer.File[];
      console.log(files);
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        console.log(newpath);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const images = urls.map((file) => {
        return file;
      });
      res.json(images);
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export { uploadImages };
