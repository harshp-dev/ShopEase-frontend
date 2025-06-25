import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { roles } from '../constants/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

const UserProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || user.role !== roles.USER) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
