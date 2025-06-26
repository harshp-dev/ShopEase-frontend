import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for orders
const mockOrders = [
  {
    _id: '685bd72f37d16db631932ddc',
    user: {
      _id: '685b80f5b4d317e44d2ceab4',
      username: 'jeet',
      email: 'limbanijeet8@gmail.com',
    },
    mobileNumber: '9876543210',
    products: [
      {
        product: {
          _id: '685bccffb52428bd371bfe30',
          name: 'iPhone 14',
          price: 75000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
              publicId: 'products/iphone14',
              _id: '685bccffb52428bd371bfe31',
            },
          ],
        },
        quantity: 2,
        _id: '685bd72f37d16db631932ddd',
      },
      {
        product: {
          _id: '685bd6cd37d16db631932dcd',
          name: 'MacBook Pro',
          price: 150000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
              publicId: 'products/macbook',
              _id: '685bd6cd37d16db631932dce',
            },
          ],
        },
        quantity: 1,
        _id: '685bd72f37d16db631932dde',
      },
    ],
    totalQuantity: 3,
    totalAmount: 300000,
    paymentId: 'PAY-1139c204-6946-414a-b285-652f75e9e3d6',
    address: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'MH',
      zip: '400001',
    },
    createdAt: '2025-01-25T11:02:07.065Z',
    updatedAt: '2025-01-25T11:02:07.065Z',
    __v: 0,
  },
  {
    _id: '685b81a8b4d317e44d2ceacd',
    user: {
      _id: '685a65f43ab2ade03fb52326',
      username: 'rahul',
      email: 'rahul@gmail.com',
    },
    mobileNumber: '9876543211',
    products: [
      {
        product: {
          _id: '685bd6cd37d16db631932dcd',
          name: 'Samsung Galaxy S23',
          price: 65000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
              publicId: 'products/samsung',
              _id: '685bd6cd37d16db631932dce',
            },
          ],
        },
        quantity: 1,
        _id: '685b81a8b4d317e44d2ceace',
      },
      {
        product: {
          _id: '685bd6cd37d16db631932dce',
          name: 'AirPods Pro',
          price: 25000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
              publicId: 'products/airpods',
              _id: '685bd6cd37d16db631932dcf',
            },
          ],
        },
        quantity: 2,
        _id: '685b81a8b4d317e44d2ceacf',
      },
    ],
    totalQuantity: 3,
    totalAmount: 115000,
    paymentId: 'PAY-3f784cb3-e2a9-4074-b06c-56aa1e9eba54',
    address: {
      street: '101 Demo St',
      city: 'Surat',
      state: 'Gujarat',
      zip: '395007',
    },
    createdAt: '2025-01-24T04:57:12.301Z',
    updatedAt: '2025-01-24T04:57:12.301Z',
    __v: 0,
  },
  {
    _id: '685b81a8b4d317e44d2ceace',
    user: {
      _id: '685a65f43ab2ade03fb52327',
      username: 'priya',
      email: 'priya@gmail.com',
    },
    mobileNumber: '9876543212',
    products: [
      {
        product: {
          _id: '685bd6cd37d16db631932dcf',
          name: 'Dell XPS 13',
          price: 120000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
              publicId: 'products/dell',
              _id: '685bd6cd37d16db631932dd0',
            },
          ],
        },
        quantity: 1,
        _id: '685b81a8b4d317e44d2cead0',
      },
    ],
    totalQuantity: 1,
    totalAmount: 120000,
    paymentId: 'PAY-4f784cb3-e2a9-4074-b06c-56aa1e9eba55',
    address: {
      street: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      zip: '110001',
    },
    createdAt: '2025-01-23T08:30:12.301Z',
    updatedAt: '2025-01-23T08:30:12.301Z',
    __v: 0,
  },
  {
    _id: '685b81a8b4d317e44d2ceacf',
    user: {
      _id: '685a65f43ab2ade03fb52328',
      username: 'amit',
      email: 'amit@gmail.com',
    },
    mobileNumber: '9876543213',
    products: [
      {
        product: {
          _id: '685bd6cd37d16db631932dd1',
          name: 'iPad Pro',
          price: 85000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
              publicId: 'products/ipad',
              _id: '685bd6cd37d16db631932dd2',
            },
          ],
        },
        quantity: 1,
        _id: '685b81a8b4d317e44d2cead1',
      },
      {
        product: {
          _id: '685bd6cd37d16db631932dd3',
          name: 'Apple Watch',
          price: 45000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
              publicId: 'products/watch',
              _id: '685bd6cd37d16db631932dd4',
            },
          ],
        },
        quantity: 1,
        _id: '685b81a8b4d317e44d2cead2',
      },
      {
        product: {
          _id: '685bd6cd37d16db631932dd5',
          name: 'Sony Headphones',
          price: 15000,
          images: [
            {
              url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
              publicId: 'products/headphones',
              _id: '685bd6cd37d16db631932dd6',
            },
          ],
        },
        quantity: 2,
        _id: '685b81a8b4d317e44d2cead3',
      },
    ],
    totalQuantity: 4,
    totalAmount: 175000,
    paymentId: 'PAY-5f784cb3-e2a9-4074-b06c-56aa1e9eba56',
    address: {
      street: '789 Tech Street',
      city: 'Bangalore',
      state: 'Karnataka',
      zip: '560001',
    },
    createdAt: '2025-01-22T15:45:12.301Z',
    updatedAt: '2025-01-22T15:45:12.301Z',
    __v: 0,
  },
];

// Async thunk to fetch orders for admin (using mock data)
export const fetchOrdersForAdmin = createAsyncThunk(
  'orders/fetchOrdersForAdmin',
  async ({ page = 1, limit = 10, search = '' }, thunkAPI) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filter orders based on search if provided
      let filteredOrders = mockOrders;
      if (search) {
        filteredOrders = mockOrders.filter(
          (order) =>
            order.user.username.toLowerCase().includes(search.toLowerCase()) ||
            order.user.email.toLowerCase().includes(search.toLowerCase()) ||
            order._id.includes(search) ||
            order.paymentId.includes(search),
        );
      }

      // Pagination logic
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

      return {
        orders: paginatedOrders,
        totalOrders: filteredOrders.length,
        page,
        totalPages: Math.ceil(filteredOrders.length / limit),
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to fetch orders');
    }
  },
);

// Async thunk to update order status (mock)
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return { id, status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update order status');
    }
  },
);

// Async thunk to delete order (mock)
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id, thunkAPI) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to delete order');
  }
});

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
      // Fetch orders
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

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status } = action.payload;
        const orderIndex = state.orders.findIndex((order) => order._id === id);
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload);
        state.totalOrders -= 1;
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
