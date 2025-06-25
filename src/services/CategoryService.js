import api from '../api/api';
import { endpoints } from '../constants/endpoints';
export const getCategories = async ({ page, limit, search }) => {
  const response = await api.get(endpoints.CATEGORY.GET_ALL_CATEGORIES, {
    params: { page, limit, search },
  });
  console.log('Response', response);
  return response.data;
};

export const deleteCategoryById = async (id) => {
  console.log('id from servcie');
  const response = await api.delete(`${endpoints.CATEGORY.DELETE_CATEGORY}/${id}`);
  return response.data;
};

export const updateCategoryById = async (id, updateData) => {
  console.log('=== SERVICE DEBUG ===');
  console.log('Service called with id:', id);
  console.log('Service called with updateData:', updateData);
  console.log('API endpoint:', `${endpoints.CATEGORY.UPDATE_CATEGORY}/${id}`);

  const response = await api.put(`${endpoints.CATEGORY.UPDATE_CATEGORY}/${id}`, updateData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log('Service response:', response);
  console.log('Service response.data:', response.data);

  return response.data;
};
