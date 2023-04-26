import axios from "axios";
export const checkImage = (file: File) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "The largest image size is 1mb";

  if (!types.includes(file.type)) err = "The image type is png / jpeg";

  return err;
};

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "st6cap4v");
  formData.append("cloud_name", "tuananh-pham");

  const response = await axios.post(
    "https://api.cloudinary.com/tuananh-pham/upload"
  );

  const data = response.data;
  return { public_id: data.public_id, url: data.secure_url };
};
