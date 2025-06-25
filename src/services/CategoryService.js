import api from '../api/api';
import { endpoints } from '../constants/endpoints';
export const getCategories = async ({ page, limit, search }) => {
  const response = await api.get(endpoints.CATEGORY.GET_ALL_CATEGORIES, {
    params: { page, limit, search },
  });
  return response.data;
};

export const deleteCategoryById = async (id) => {
  const response = await api.delete(`${endpoints.CATEGORY.DELETE_CATEGORY}/${id}`);
  return response.data;
};

export const updateCategoryById = async (id, updateData) => {
  const response = await api.put(`${endpoints.CATEGORY.UPDATE_CATEGORY}/${id}`, updateData);

  return response.data;
};
