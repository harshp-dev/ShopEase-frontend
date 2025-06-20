import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import ResetPassword from '../pages/user/ResetPassword';
import ChangePassword from '../pages/user/ChangePaasword';
import ForgotPassword from '../pages/user/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}></Route>
      <Route path="/user" element={<UserDashboard />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/change-password" element={<ChangePassword />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
    </Routes>
  );
};

export default AppRoutes;
