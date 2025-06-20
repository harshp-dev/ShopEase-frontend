import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import ProtectedRoute from './ProtectedRoute';
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />}></Route>
      </Route>
      <Route path="/user" element={<UserDashboard />}></Route>
    </Routes>
  );
};

export default AppRoutes;
