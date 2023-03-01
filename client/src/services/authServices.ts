import axios from "axios";
import { config } from "../utils/axiosConfig";
import { BASE_URL } from "../utils/baseUrl";
interface UserLogin {
  email: string;
  password: string;
}
interface UserEdit {
  fullname: string;
  username: string;
  avatar: string;
  mobile: string;
  gender: string;
  address: string;
  story: string;
  website: string;
}
const register = async (user: UserLogin) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user: UserLogin) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  localStorage.removeItem("user");

  await axios.post(`${BASE_URL}/auth/logout`);

  window.location.href = "/";
};
const editUser = async (user: UserEdit) => {
  const response = await axios.put(`${BASE_URL}/auth`, user, config());

  return response.data;
};
const authService = {
  login,
  register,
  logout,
  editUser,
};

export default authService;
