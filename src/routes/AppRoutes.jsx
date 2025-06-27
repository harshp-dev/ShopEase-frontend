import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLayout from '../pages/admin/AdminLayout';
import Categories from '../pages/admin/Categories';
import Orders from '../pages/admin/Orders';
import Products from '../pages/admin/Products';
import ForgotPassword from '../pages/ForgotPassword';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/LoginPage';
import PageNotFound from '../pages/NotFound';
import ProductDetails from '../pages/product/ProductDetail';
import Register from '../pages/RegisterPage';
import CartPage from '../pages/user/CartPage';
import CategoryProduct from '../pages/user/CategoryProduct';
import ChangePassword from '../pages/user/ChangePassword';
import Checkout from '../pages/user/Checkout';
import ResetPassword from '../pages/user/ResetPassword';
import ShopPage from '../pages/user/ShopPage';
import UserDashboard from '../pages/user/UserDashboard';
import UserLayout from '../pages/user/UserLayout';
import AdminProtectedRoute from './AdminProtectedRoute';
import RestrictedRoute from './RestrictedRoute';
import UserProtectedRoute from './UserProtectedRoute';
import OrdersPage from '../pages/user/OrdersPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<RestrictedRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/change-password" element={<ChangePassword />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Route>

      <Route element={<UserProtectedRoute />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="shop" element={<ShopPage />} />
          {/* <Route path="orders" element={<OrdersPage />} /> */}
          <Route path="cart" element={<CartPage />} />
          <Route path="category/:categoryName" element={<CategoryProduct />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
