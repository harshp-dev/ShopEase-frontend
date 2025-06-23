import { endpoints } from '../constants/endpoints';
import api from '../api/api';

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

export const resetPassword = async (token, data) => {
  try {
    const res = await api.post(`${endpoints.AUTH.RESET_PASSWORD_ENDPOINT}/${token}`, {
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const changePassword = async (data) => {
  try {
    const res = await api.post(endpoints.AUTH.CHANGE_PASSWORD_ENDPOINT, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  throw new Error(message);
};
