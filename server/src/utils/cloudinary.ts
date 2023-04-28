import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINAIRE,
  api_secret: process.env.API_SECRET_CLOUDINAIRE,
  secure: true,
});

export const cloudinaryUploadImgAvatar = async (fileUpload: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileUpload,
      {
        folder: "MERN-Instagram-typescript/avatar", // specify the name of the folder where you want to upload the image
        resource_type: "auto",
      },
      (error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id.split("/")[2],
          });
        }
      }
    );
  });
};

export const cloudinaryUploadImgPost = async (fileUpload: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileUpload,
      {
        folder: "MERN-Instagram-typescript/post", // specify the name of the folder where you want to upload the image
        resource_type: "auto",
      },
      (error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id.split("/")[2],
          });
        }
      }
    );
  });
};

export const cloudinaryUploadImgMessages = async (fileUpload: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileUpload,
      {
        folder: "MERN-Instagram-typescript/messages", // specify the name of the folder where you want to upload the image
        resource_type: "auto",
      },
      (error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id.split("/")[2],
          });
        }
      }
    );
  });
};
export const cloudinaryDeleteImgAvatar = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      `MERN-Instagram-typescript/avatar/${publicId}`,

      (error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};

export const cloudinaryDeleteImgPost = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      `MERN-Instagram-typescript/post/${publicId}`,

      (error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};

export const cloudinaryDeleteImgMessages = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      `MERN-Instagram-typescript/messages/${publicId}`,

      (error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};
