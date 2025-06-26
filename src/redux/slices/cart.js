import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, updateCartItem, removeCartItem, addToCart } from '../../services/CartService';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    return await getCart();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await addToCart(productId, quantity);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await updateCartItem(productId, quantity);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deleteCartItem = createAsyncThunk('cart/deleteItem', async (productId, thunkAPI) => {
  try {
    return await removeCartItem(productId);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })

      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export default cartSlice.reducer;
