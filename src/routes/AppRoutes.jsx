import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ForgotPassword from '../pages/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/adminlogin" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/admin" element={<AdminDashboard />}></Route>
      <Route path="/user" element={<UserDashboard />}></Route>
      <Route></Route>
    </Routes>
  );
};

export default AppRoutes;
