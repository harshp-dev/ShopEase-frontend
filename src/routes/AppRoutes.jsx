import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import UserProtectedRoute from './UserProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import ResetPassword from '../pages/user/ResetPassword';
import ChangePassword from '../pages/user/ChangePaasword';
import ForgotPassword from '../pages/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<UserProtectedRoute />}>
        <Route path="/user" element={<UserDashboard />} />
      </Route>
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
