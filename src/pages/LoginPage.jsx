import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthCard from '../components/common/AuthCard';
import Form from '../components/common/Form';
import { loginUser, loginAdmin } from '../services/AuthService';
// Login component goes here
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminLogin = location.pathname === '/admin/login';

  const handleLogin = async (data) => {
    try {
      isAdminLogin ? await loginAdmin(data) : await loginUser(data);
      if (isAdminLogin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <AuthCard
      title={isAdminLogin ? 'Admin Login' : 'Login'}
      subtitle={
        isAdminLogin
          ? 'Welcome Admin! Please log in to continue.'
          : 'Welcome back! Please log in to continue.'
      }
    >
      <Form type="login" onSubmit={handleLogin} />
      {!isAdminLogin && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      )}
    </AuthCard>
  );
};

export default Login;
