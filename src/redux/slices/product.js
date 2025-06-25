import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../services/ProductService';

export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async ({ category, page = 1, limit = 4, search = '' }, thunkAPI) => {
    try {
      return await getProducts({ category, page, limit, search });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productsByCategory: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const category = action.meta.arg.category;
        state.productsByCategory[category] = {
          items: action.payload.products || [],
          total: action.payload.totalCount,
          page: action.payload.currentPage,
          pages: action.payload.totalPages,
        };
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
