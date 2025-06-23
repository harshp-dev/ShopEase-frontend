import { Route, Routes } from 'react-router-dom';
// import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ResetPassword from '../pages/user/ResetPassword';
import ChangePassword from '../pages/user/ChangePaasword';
// import UserDashboard from '../pages/user/UserDashboard';
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
    </Routes>
  );
};

export default AppRoutes;
