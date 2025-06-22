import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthCard from '../components/common/AuthCard';
import Form from '../components/common/Form';
import { registerUser } from '../services/AuthService';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      navigate('/login');
    } catch (error) {
      console.log('Registration error:', error);
    }
  };

  return (
    <AuthCard title="Register" subtitle="Create a new account.">
      <Form type="register" onSubmit={handleRegister} />
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Register;
