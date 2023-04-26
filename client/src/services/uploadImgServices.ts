import axios from "axios";
import { BASE_URL } from "./../utils/baseUrl";
import { config } from "../utils/axiosConfig";

const uploadImgAvatar = async (data: FormData) => {
  const response = await axios.post(
    `${BASE_URL}/upload/avatar`,
    data,
    config()
  );
  return response.data;
};
const uploadImgPost = async (data: FormData) => {
  const response = await axios.post(`${BASE_URL}/upload/post`, data, config());
  return response.data;
};

const uploadImgMessages = async (data: FormData) => {
  const response = await axios.post(
    `${BASE_URL}/upload/messages`,
    data,
    config()
  );
  return response.data;
};

const deleteImgAvatar = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/upload/delete-img/avatar/${id}`,

    config()
  );
  return response.data;
};
const deleteImgPost = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/upload/delete-img/post/${id}`,

    config()
  );
  return response.data;
};
const deleteImgMessages = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/upload/delete-img/messages/${id}`,

    config()
  );
  return response.data;
};
const uploadImgServices = {
  uploadImgAvatar,
  uploadImgPost,
  uploadImgMessages,
  deleteImgAvatar,
  deleteImgPost,
  deleteImgMessages,
};
export default uploadImgServices;
