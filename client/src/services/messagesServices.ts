import axios from "axios";
import { config } from "../utils/axiosConfig";

import { BASE_URL } from "../utils/baseUrl";
import { ICreateMessage } from "../utils/interface";

const createMessage = async (data: ICreateMessage) => {
  const response = await axios.post(`${BASE_URL}/messages`, data, config());
  return response.data;
};

const getMessages = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/messages/${id}`, config());
  return response.data;
};

const deleteMessage = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/messages/delete/${id}`,

    config()
  );
  return response.data;
};

const messagesService = {
  createMessage,
  getMessages,
  deleteMessage,
};
export default messagesService;
