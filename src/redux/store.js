import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import categoryReducer from './slices/category';
import productReducer from './slices/product';
import orderReducer from './slices/order';
import cartReducer from './slices/cart';
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

export default store;
