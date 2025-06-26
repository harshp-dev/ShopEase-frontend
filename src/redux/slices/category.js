import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategories,
  deleteCategoryById,
  updateCategoryById,
  addCategory,
} from '../../services/CategoryService';

// Fetch categories
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

// Delete category
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

// Update category
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateCategoryById(id, data);
      const updatedCategory = response.data?.category || response.category || response;
      const result = { id, updatedCategory };
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Add category
export const addCategoryThunk = createAsyncThunk(
  'category/addCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addCategory(formData);
      return response.data; // Assuming the response contains the newly added category
    } catch (error) {
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
      // Fetch Categories
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

      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
        state.total -= 1;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedCategory } = action.payload;
        const index = state.categories.findIndex((category) => category._id === id);
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.total += 1;
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
