import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../services/ProductService';

export const fetchProductsForAdmin = createAsyncThunk(
  'product/fetchProductsForAdmin',
  async ({ page = 1, limit = 10, search = '' }, thunkAPI) => {
    try {
      return await getProducts({ page, limit, search });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  },
);

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

export const fetchProductsByUser = createAsyncThunk(
  'product/fetchProductsByUser',
  async ({ category, page = 1, limit = 10, search = '' }, thunkAPI) => {
    try {
      return await getProducts({ category, search, page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productsByCategory: {},
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.totalCount;
        state.page = action.payload.currentPage;
        state.pages = action.payload.totalPages;
      })
      .addCase(fetchProductsForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.total = action.payload.totalCount;
        state.page = action.payload.currentPage;
        state.pages = action.payload.totalPages;
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
    builder
      .addCase(fetchProductsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.total = action.payload.totalCount;
        state.page = action.payload.currentPage;
        state.pages = action.payload.totalPages;
      })
      .addCase(fetchProductsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
