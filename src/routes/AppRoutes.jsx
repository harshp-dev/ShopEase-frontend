import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}></Route>
      <Route path="/user" element={<UserDashboard />}></Route>
      <Route></Route>
    </Routes>
  );
};

export default AppRoutes;
