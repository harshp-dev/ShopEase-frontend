import { endpoints } from '../constants/endpoints';
import api from '../api/api';
import { showErrorToast } from '../Utils/ToastUtils.jsx';

const handleApiError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  showErrorToast(message);
  throw error; // Re-throw for further handling in Redux or component
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post(endpoints.ORDER.ADD_ORDER, orderData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllUserOrders = async (params = {}) => {
  try {
    const { search = '', page = 1, limit = 10 } = params;
    const response = await api.get(endpoints.ORDER.GET_ALL_ORDERS, {
      params: { search, page, limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserOrders = async (params = {}) => {
  try {
    const { page = 1, limit = 10 } = params;
    const response = await api.get(endpoints.ORDER.GET_USER_ORDERS, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
