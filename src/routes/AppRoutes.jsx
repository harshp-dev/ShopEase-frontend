import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import UserDashboard from '../pages/user/UserDashboard';
// import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/user/ChangePaasword';
import ResetPassword from '../pages/user/ResetPassword';
import AdminLayout from '../pages/admin/AdminLayout';
import Products from '../pages/admin/Products';
import Categories from '../pages/admin/Categories';
import Orders from '../pages/admin/Orders';

import UserLayout from '../pages/user/UserLayout';
import CartPage from '../pages/user/CartPage';
import HomePage from '../pages/user/HomePage';
import OrdersPage from '../pages/user/OrdersPage';
import ShopPage from '../pages/user/ShopPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/admin" element={<AdminDashboard />}></Route>
      <Route path="/user" element={<UserDashboard />}></Route>
      <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
      <Route path="/change-password" element={<ChangePassword />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      {/* <Route element={<ProtectedRoute />}> */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="categories" element={<Categories />} />
      </Route>

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>

      {/* </Route> */}
    </Routes>
  );
};

export default AppRoutes;
