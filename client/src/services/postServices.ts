import axios from "axios";
import { Socket } from "socket.io-client";
import { config } from "../utils/axiosConfig";

import { BASE_URL } from "../utils/baseUrl";
import { ICreatePost, postUpdate } from "../utils/interface";

const createPost = async (data: ICreatePost) => {
  const response = await axios.post(`${BASE_URL}/post`, data, config());
  return response.data;
};
const getPost = async () => {
  const response = await axios.get(`${BASE_URL}/post`, config());
  return response.data;
};
const getUserPost = async (username: string) => {
  const response = await axios.get(
    `${BASE_URL}/post/user/${username}`,
    config()
  );
  return response.data;
};
const getExplorePosts = async () => {
  const response = await axios.get(`${BASE_URL}/post/explore`, config());
  return response.data;
};
const getAPost = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/post/${id}`, config());
  return response.data;
};
const likePost = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/post/like/${id}`,
    null,
    config()
  );
  return response.data;
};
const unLikePost = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/post/unlike/${id}`,
    null,
    config()
  );
  return response.data;
};
const updatePost = async (data: postUpdate) => {
  const response = await axios.put(`${BASE_URL}/post/update`, data, config());
  return response.data;
};
const deletePost = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/post/delete/${id}`,

    config()
  );
  return response.data;
};

const getSavePost = async (id: String) => {
  const response = await axios.get(`${BASE_URL}/post/save/${id}`, config());
  return response.data;
};
const postService = {
  createPost,
  getPost,
  getUserPost,
  getAPost,
  likePost,
  unLikePost,
  updatePost,
  deletePost,
  getExplorePosts,
  getSavePost,
};
export default postService;
