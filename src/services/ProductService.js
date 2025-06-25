import { showSuccessToast, showErrorToast } from '../Utils/ToastUtils.jsx';
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

export const addToCart = async (productId, quantity = 1) => {
  try {
    // TODO: Replace with real API call when backend is ready
    showSuccessToast(`${quantity} Product added to cart successfully!`);
    return { success: true, message: 'Product added to cart' };
  } catch (error) {
    handleError(error);
    throw error;
  }
};
