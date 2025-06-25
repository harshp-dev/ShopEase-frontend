import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ResetPassword from '../pages/user/ResetPassword';
import ChangePassword from '../pages/user/ChangePassword';
import LandingPage from '../pages/LandingPage';
import ForgotPassword from '../pages/ForgotPassword';
import AdminProtectedRoute from './AdminProtectedRoute';
import UserProtectedRoute from './UserProtectedRoute';
import AdminLayout from '../pages/admin/AdminLayout';
import Products from '../pages/admin/Products';
import Orders from '../pages/admin/Orders';
import Categories from '../pages/admin/Categories';
import ShopPage from '../pages/user/ShopPage';
import OrdersPage from '../pages/user/OrdersPage';
import CartPage from '../pages/user/CartPage';
import UserLayout from '../pages/user/UserLayout';
import RestrictedRoute from './RestrictedRoute';
import ProductDetails from '../pages/product/ProductDetail';
import UserDashboard from '../pages/user/UserDashboard';

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
          <Route path="orders" element={<OrdersPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Route>
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* </Route> */}
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default AppRoutes;
