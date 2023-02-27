import axios from "axios";
import { BASE_URL } from "./../utils/baseUrl";
import { config } from "../utils/axiosConfig";

const search = async (search: string) => {
  const response = await axios.get(
    `${BASE_URL}/user/search?username=${search}`
  );

  return response.data;
};
const getUser = async (username: string) => {
  const response = await axios.get(`${BASE_URL}/user/${username}`, config);

  return response.data;
};

const userService = {
  search,
  getUser,
};
export default userService;
