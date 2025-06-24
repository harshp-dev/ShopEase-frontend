import { showSuccessToast, showErrorToast } from '../Utils/ToastUtils';
import { mockProducts } from '../data/mockData.js';

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  showErrorToast(message);
};

// Mock function - replace with real API call when backend is ready
const getMockProductById = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const product = mockProducts.find((p) => p._id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return { data: product, success: true };
};

export const getProductById = async (id) => {
  try {
    const response = await getMockProductById(id);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    // TODO: Replace with real API call when backend is ready
    // const response = await api.post(endpoints.CART.ADD_TO_CART, { productId, quantity });
    // showSuccessToast('Product added to cart successfully!');
    // return response.data;

    // Mock implementation
    showSuccessToast(`${quantity}Product added to cart successfully!`);
    return { success: true, message: 'Product added to cart' };
  } catch (error) {
    handleError(error);
    throw error;
  }
};
