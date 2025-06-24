import { endpoints } from '../constants/endpoints';
import api from '../api/api';
import { showSuccessToast, showErrorToast } from '../Utils/ToastUtils';

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  showErrorToast(message);
};

export const getUser = async () => {
  const response = await api.get(endpoints.AUTH.ME_ENDPOINT);
  return response.data;
};

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
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const response = await api.post(endpoints.AUTH.REGISTER_ENDPOINT, payload);
    showSuccessToast('Registration successful! Please log in.');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await api.post(endpoints.AUTH.FORGOT_PASSWORD_ENDPOINT, data);
    showSuccessToast('Password reset link sent to your email!');
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post(endpoints.AUTH.LOGOUT_ENDPOINT);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const changePassword = async (data) => {
  try {
    const payload = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    const res = await api.post(endpoints.AUTH.CHANGE_PASSWORD_ENDPOINT, payload);
    showSuccessToast('Password changed successfully!');
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (token, data) => {
  try {
    const payload = {
      password: data.newPassword,
    };
    const res = await api.post(`${endpoints.AUTH.RESET_PASSWORD_ENDPOINT}/${token}`, payload);
    showSuccessToast('Password reset successfully!');
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
