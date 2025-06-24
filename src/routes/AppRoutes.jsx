import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import UserDashboard from '../pages/user/UserDashboard';
// import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/user/ChangePaasword';
import ResetPassword from '../pages/user/ResetPassword';
import LandingPage from '../pages/LandingPage';
import ProductDetails from '../pages/product/ProductDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/admin" element={<AdminDashboard />} />
      {/* </Route> */}
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default AppRoutes;
