import axios from "axios";
import { config, getTokenFromLocalStorage } from "../utils/axiosConfig";

import { BASE_URL } from "../utils/baseUrl";
import {
  IForgotPassword,
  IResetPassword,
  UserEdit,
  UserLogin,
  UserLoginFaceBook,
  UserRegister,
} from "../utils/interface";

const register = async (user: UserRegister) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, user, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.accessToken));
  }
  return response.data.user;
};

const login = async (user: UserLogin) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, user, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.accessToken));
  }

  return response.data.user;
};

const loginFacebookUser = async (data: UserLoginFaceBook) => {
  const response = await axios.post(`${BASE_URL}/auth/login-facebook`, data, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.accessToken));
  }

  return response.data.user;
};
const resetPassword = async (data: IResetPassword) => {
  const response = await axios.post(`${BASE_URL}/auth/reset-password/`, data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.accessToken));
  }
  return response.data;
};
const refreshToken = async () => {
  const firstLogin = getTokenFromLocalStorage();

  if (firstLogin) {
    const response = await axios.get(`${BASE_URL}/auth/refresh`, config());
    if (response.data) {
      // localStorage.setItem("user", JSON.stringify(response.data));
      console.log(localStorage.setItem("user", JSON.stringify(response.data)));
    }

    return response.data;
  }
};
const logout = async () => {
  await axios.get(`${BASE_URL}/auth/logout`, config());
  localStorage.removeItem("user");

  window.location.href = "/";
};
const editUser = async (user: UserEdit) => {
  const response = await axios.put(`${BASE_URL}/auth`, user, config());

  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${BASE_URL}/auth`, config());

  return response.data;
};
const forgotPassword = async (data: IForgotPassword) => {
  const response = await axios.post(`${BASE_URL}/auth/forgot-password`, data);

  return response.data;
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
  editUser,
  getCurrentUser,
  loginFacebookUser,
  resetPassword,
  forgotPassword,
};

export default authService;
