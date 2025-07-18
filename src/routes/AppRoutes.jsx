import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import UserDashboard from '../pages/user/UserDashboard';
// import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/user/ChangePaasword';
import ResetPassword from '../pages/user/ResetPassword';

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
      <Route path="/admin" element={<AdminDashboard />}></Route>
      {/* </Route> */}
    </Routes>
  );
};

export default AppRoutes;
