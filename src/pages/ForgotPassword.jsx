import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/common/AuthCard';
import Form from '../components/common/Form';
import { forgotPassword } from '../services/AuthService';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgot = async (data) => {
    try {
      await forgotPassword(data);
      navigate('/login');
    } catch (error) {
      console.log('Forgot password error:', error);
    }
  };

  return (
    <AuthCard title="Forgot Password" subtitle="Enter your email to reset your password">
      <Form type="forgotPassword" onSubmit={handleForgot} />
    </AuthCard>
  );
};

export default ForgotPassword;
