import React from 'react';
import { logoutUser } from '../../services/AuthService';
import { logout } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      admin
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

export default AdminDashboard;
