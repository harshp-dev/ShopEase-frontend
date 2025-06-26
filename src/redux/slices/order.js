import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getAllUserOrders, getUserOrders } from '../../services/OrderService.js';

export const placeOrder = createAsyncThunk('orders/placeOrder', async (orderData, thunkAPI) => {
  try {
    const response = await createOrder(orderData);
    if (!response.success) {
      throw new Error(response.message || 'Failed to place order');
    }
    return response.order;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || 'Failed to place order');
  }
});

export const fetchOrdersForAdmin = createAsyncThunk(
  'orders/fetchOrdersForAdmin',
  async ({ page = 1, limit = 10, search = '' }, thunkAPI) => {
    try {
      const response = await getAllUserOrders({ search, page, limit });
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch orders');
      }
      return {
        orders: response.orders,
        totalOrders: response.totalOrders,
        page: response.page,
        totalPages: response.totalPages,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to fetch orders');
    }
  },
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await getUserOrders({ page, limit });
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch user orders');
      }
      return {
        orders: response.orders,
        totalOrders: response.totalOrders,
        page: response.page,
        totalPages: response.totalPages,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to fetch user orders');
    }
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    totalOrders: 0,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [action.payload, ...state.orders];
        state.totalOrders += 1;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchOrdersForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
