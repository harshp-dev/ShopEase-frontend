import axios from 'axios';
import { endpoints } from '../constants/endpoints';
export const getCategories = async ({ page = 1, limit = 10, search = '' }) => {
  const response = await axios.get(endpoints.CATEGORY.GET_CATEGORIES, {
    params: {
      page,
      limit,
      search,
    },
  });
  return response;
};
