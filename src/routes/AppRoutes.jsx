import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ResetPassword from '../pages/user/ResetPassword';
import ChangePassword from '../pages/user/ChangePaasword';
import LandingPage from '../pages/LandingPage';
import UserDashboard from '../pages/user/UserDashboard';
import ForgotPassword from '../pages/ForgotPassword';
import AdminProtectedRoute from './AdminProtectedRoute';
import UserProtectedRoute from './UserProtectedRoute';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route element={<UserProtectedRoute />}>
        <Route path="/user" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
