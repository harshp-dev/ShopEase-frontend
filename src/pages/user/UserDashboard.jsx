import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/AuthService';
import { logout } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      UserDashboard
      <button
        onClick={async () => {
          await logoutUser();
          dispatch(logout());
          navigate('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
