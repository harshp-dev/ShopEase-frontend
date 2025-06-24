import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { roles } from '../constants/constants';
import Loading from '../components/common/Loading';

const AdminProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }
  if (!user || user.role !== roles.ADMIN) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
