import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategories,
  deleteCategoryById,
  updateCategoryById,
} from '../../services/CategoryService';

// to fetch categories
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async ({ page = 1, limit = 10, search = '' }, thunkAPI) => {
    try {
      return await getCategories({ page, limit, search });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  },
);

// to delete category
export const deleteCategory = createAsyncThunk(
  'category/deleteCategoryById',
  async (id, thunkAPI) => {
    try {
      await deleteCategoryById(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  },
);

// to update the category
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log('=== REDUX THUNK DEBUG ===');
      console.log('A. Thunk called with id:', id);
      console.log('B. Thunk called with data:', data);

      const response = await updateCategoryById(id, data);

      console.log('C. Service response:', response);
      console.log('D. Response.data:', response.data);

      const result = { id, updatedCategory: response.data || response };
      console.log('E. Returning result:', result);

      return result;
    } catch (error) {
      console.log('F. Thunk error:', error);
      console.log('G. Error response:', error.response?.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
        state.total -= 1;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedCategory } = action.payload;

        // Update the specific category in the categories array
        const index = state.categories.findIndex((category) => category._id === id);
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
