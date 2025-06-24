import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { roles } from '../constants/constants';
import Loading from '../components/common/Loading';

const RestrictedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const query = new URLSearchParams(window.location.search);
  const redirect = query.get('redirect') || '/';

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (user.role === roles.ADMIN) {
      return <Navigate to="/admin" replace />;
    }
    if (user.role === roles.USER) {
      return <Navigate to="/user" replace />;
    }
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default RestrictedRoute;
