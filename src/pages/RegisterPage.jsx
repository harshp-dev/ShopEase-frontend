import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthCard from '../components/common/AuthCard';
import Form from '../components/common/Form';
import { registerUser } from '../services/AuthService';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data, setError) => {
    if (data.password !== data.confirmpassword) {
      setError('confirmpassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    try {
      await registerUser(data);
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Registration failed');
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
