import axios from "axios";
import { config } from "../utils/axiosConfig";

import { BASE_URL } from "../utils/baseUrl";
import { Comment, commentUpdate } from "../utils/interface";

const createComment = async (data: Comment) => {
  const response = await axios.post(`${BASE_URL}/comment`, data, config());
  return response.data;
};

const getComments = async () => {
  const response = await axios.get(`${BASE_URL}/comment`, config());
  return response.data;
};

const getCommentsByPost = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/comment/${id}`, config());
  return response.data;
};

const likeComment = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/comment/like/${id}`,
    null,
    config()
  );
  return response.data;
};

const unLikeComment = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/comment/unlike/${id}`,
    null,
    config()
  );
  return response.data;
};

const updateComment = async (data: commentUpdate) => {
  const response = await axios.put(
    `${BASE_URL}/comment/update`,
    data,
    config()
  );
  return response.data;
};
const deleteComment = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/comment/delete/${id}`,

    config()
  );
  return response.data;
};

const commentService = {
  createComment,
  getComments,
  getCommentsByPost,
  likeComment,
  unLikeComment,
  updateComment,
  deleteComment,
};
export default commentService;
