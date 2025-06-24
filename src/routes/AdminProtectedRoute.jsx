import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { roles } from '../constants/constants';

const AdminProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== roles.ADMIN) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
