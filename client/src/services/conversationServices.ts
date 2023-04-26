import axios from "axios";
import { config } from "../utils/axiosConfig";

import { BASE_URL } from "../utils/baseUrl";

const createConversation = async (id: string) => {
  const response = await axios.post(
    `${BASE_URL}/conversation/${id}`,
    null,
    config()
  );
  return response.data;
};

const getConversations = async () => {
  const response = await axios.get(`${BASE_URL}/conversation`, config());
  return response.data;
};

const deleteConversation = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/conversation/delete/${id}`,

    config()
  );
  return response.data;
};
const isReadConversation = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/conversation/${id}`,
    null,
    config()
  );
  return response.data;
};

const conversationService = {
  createConversation,
  getConversations,
  deleteConversation,
  isReadConversation,
};
export default conversationService;
