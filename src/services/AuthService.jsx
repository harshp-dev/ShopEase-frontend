import axios from 'axios';
import { endpoints } from '../constants/endpoints';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export const loginUser = async (data) => {
  try {
    const response = await api.post(endpoints.AUTH.LOGIN_ENDPOINT, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const loginAdmin = async (data) => {
  try {
    const res = await api.post(endpoints.AUTH.ADMIN_LOGIN_ENDPOINT, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
export const registerUser = async (data) => {
  try {
    const response = await api.post(endpoints.AUTH.REGISTER_ENDPOINT, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await api.post(endpoints.AUTH.FORGOT_PASSWORD_ENDPOINT, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  throw new Error(message);
};
