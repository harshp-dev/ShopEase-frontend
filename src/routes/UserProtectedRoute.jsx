import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { roles } from '../constants/constants';

const UserProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== roles.USER) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
