import { showSuccessToast, showErrorToast } from '../Utils/ToastUtils.jsx';
import api from '../api/api.js';
import { endpoints } from '../constants/endpoints.js';

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Something went wrong';
  showErrorToast(message);
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

export const getProducts = async ({ category = null, page, limit, search }) => {
  try {
    const response = await api.get(endpoints.PRODUCT.GET_PRODUCT, {
      params: { category, page, limit, search },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteProductById = async (id) => {
  const response = await api.delete(`${endpoints.PRODUCT.DELETE_PRODUCT}/${id}`);
  return response.data;
};

export const updateProductById = async (id, updateData) => {
  try {
    const data = {
      ...updateData,
      images: updateData.images ? Array.from(updateData.images) : [],
    };

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, data[key]);
      }
    });
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        if (file instanceof File) {
          formData.append('images', file);
        }
      });
    }

    const response = await api.put(`${endpoints.PRODUCT.UPDATE_PRODUCT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    showSuccessToast('Product updated successfully!');
    return response.data;
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
