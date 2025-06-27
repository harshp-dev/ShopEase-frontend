import { showSuccessToast, showErrorToast } from '../Utils/ToastUtils';
import api from '../api/api';
import { endpoints } from '../constants/endpoints';

const handleError = (error) => {
  const message = error?.response?.data?.error || error?.message || 'Something went wrong';
  showErrorToast(message);
  throw error;
};

export const getCart = async () => {
  try {
    const res = await api.get(endpoints.CART.GET_CART);
    return {
      items: res.data.items,
      totalPrice: res.data.totalPrice,
    };
  } catch (error) {
    handleError(error);
  }
};
export const addToCart = async (productId, quantity = 1) => {
  try {
    const res = await api.post(endpoints.CART.ADD_TO_CART, { productId, quantity });
    showSuccessToast(res.data.message);
    return {
      items: res.data.cart.items,
      totalPrice: res.data.cart.totalPrice,
    };
  } catch (error) {
    handleError(error);
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const res = await api.put(`${endpoints.CART.UPDATE_CART_ITEM}/${productId}`, { quantity });
    //showSuccessToast(res.data.message || 'Cart updated successfully!');
    return {
      items: res.data.cart.items,
      totalPrice: res.data.cart.totalPrice,
    };
  } catch (error) {
    handleError(error);
  }
};

export const removeCartItem = async (productId) => {
  try {
    const res = await api.delete(`${endpoints.CART.REMOVE_CART_ITEM}/${productId}`);
    showSuccessToast(res.data.message || 'Item removed from cart');
    return {
      items: res.data.cart.items,
      totalPrice: res.data.cart.totalPrice,
    };
  } catch (error) {
    handleError(error);
  }
};
