import axios from "axios";

import { config } from "../utils/axiosConfig";

import { BASE_URL } from "../utils/baseUrl";
import { ICreateNotification } from "../utils/interface";

const createNotification = async (data: ICreateNotification) => {
  const response = await axios.post(`${BASE_URL}/notification`, data, config());
  return response.data;
};
const getNotification = async () => {
  const response = await axios.get(`${BASE_URL}/notification`, config());
  return response.data;
};

const deleteNotification = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/notification/${id}`,

    config()
  );
  return response.data;
};
const isReadNotification = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/notification/${id}`,
    null,

    config()
  );
  return response.data;
};

const postService = {
  createNotification,
  getNotification,
  deleteNotification,
  isReadNotification,
};
export default postService;
