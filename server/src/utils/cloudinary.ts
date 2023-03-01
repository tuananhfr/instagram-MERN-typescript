import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINAIRE,
  api_secret: process.env.API_SECRET_CLOUDINAIRE,
});

export const cloudinaryUploadImg = async (fileUpload: string) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileUpload, (result: any) => {
      resolve({
        url: result.secure_url,
        asset_id: result.asset_id,
        public_id: result.public_id,
        resource_type: "auto",
      });
    });
  });
};
