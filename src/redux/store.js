import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import categoryReducer from './slices/category';
import productReducer from './slices/product';
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export default store;
