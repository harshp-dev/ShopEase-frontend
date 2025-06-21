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
      alert('Password reset link sent to your email!');
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Something went wrong');
    }
  };

  return (
    <AuthCard title="Forgot Password" subtitle="Enter your email to reset your password">
      <Form type="forgot" onSubmit={handleForgot} />
    </AuthCard>
  );
};

export default ForgotPassword;
