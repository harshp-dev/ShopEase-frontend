import { showErrorToast } from '../Utils/ToastUtils.jsx';
import api from '../api/api.js';
import { endpoints } from '../constants/endpoints.js';

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  showErrorToast(message);
};

export const getProducts = async ({ category, search, page, limit }) => {
  try {
    const response = await api.get(endpoints.PRODUCT.GET_PRODUCT, {
      params: { category, search, page, limit },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`${endpoints.PRODUCT.GET_PRODUCT}/${id}`);
    return response.data.product;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
