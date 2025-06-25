import api from '../api/api';
import { endpoints } from '../constants/endpoints';

export const getCategories = async ({ page, limit, search }) => {
  const response = await api.get(endpoints.CATEGORY.GET_CATEGORIES, {
    params: { page, limit, search },
  });
  console.log('Response', response);
  return response.data;
};
