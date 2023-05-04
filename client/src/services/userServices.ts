import axios from "axios";
import { BASE_URL } from "./../utils/baseUrl";
import { config } from "../utils/axiosConfig";
import { User } from "../utils/interface";

const search = async (search: string) => {
  const response = await axios.get(
    `${BASE_URL}/user/search?username=${search}`
  );

  return response.data;
};
const getSuggestionUser = async () => {
  const response = await axios.get(`${BASE_URL}/user/suggestions`, config());

  return response.data;
};

const getUser = async (username: string) => {
  const response = await axios.get(`${BASE_URL}/user/${username}`, config());

  return response.data;
};

const followUser = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/user/follow/${id}`,
    null,
    config()
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const unFollowUser = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/user/unfollow/${id}`,
    null,
    config()
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
const savePost = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/user/save-post/${id}`,
    null,
    config()
  );

  return response.data;
};
const unSavePost = async (id: string) => {
  const response = await axios.put(
    `${BASE_URL}/user/unsave-post/${id}`,
    null,
    config()
  );

  return response.data;
};
const userService = {
  search,
  getUser,
  followUser,
  unFollowUser,
  getSuggestionUser,
  savePost,
  unSavePost,
};
export default userService;
