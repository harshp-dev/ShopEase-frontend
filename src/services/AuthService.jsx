import { endpoints } from '../constants/endpoints';
import api from '../api/api';
import { showSuccessToast, showErrorToast } from '../Utils/ToastUtils';

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  showErrorToast(message);
  // throw new Error(message);
};

export const loginUser = async (data) => {
  try {
    const response = await api.post(endpoints.AUTH.LOGIN_ENDPOINT, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const loginAdmin = async (data) => {
  try {
    const res = await api.post(endpoints.AUTH.ADMIN_LOGIN_ENDPOINT, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
export const registerUser = async (data) => {
  try {
    const response = await api.post(endpoints.AUTH.REGISTER_ENDPOINT, data);
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
