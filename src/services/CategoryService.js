import api from '../api/api';
import { endpoints } from '../constants/endpoints';

export const getCategories = async ({ page, limit, search }) => {
  try {
    const response = await api.get(endpoints.CATEGORY.GET_CATEGORIES, {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.log('Error while fetching categories', error);
    throw error;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    console.log('id from servcie');
    const response = await api.delete(`${endpoints.CATEGORY.DELETE_CATEGORY}/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error while deleting category', error);
    throw error;
  }
};

export const updateCategoryById = async (id, updateData) => {
  try {
    const response = await api.put(`${endpoints.CATEGORY.UPDATE_CATEGORY}/${id}`, updateData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error updating the product', error);
    throw error;
  }
};

export const addCategory = async (formData) => {
  try {
    const response = await api.post(endpoints.CATEGORY.ADD_CATEGORY, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.log('Error adding product', error);
    throw error;
  }
};
