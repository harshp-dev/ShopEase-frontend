import { useParams, useNavigate } from 'react-router-dom';
import AuthCard from './../../components/common/AuthCard';
import Form from './../../components/common/Form';
import { resetPassword } from '../../services/AuthService';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (data) => {
    try {
      await resetPassword(token, data);
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };
  return (
    <AuthCard title="Reset Your Password" subtitle="Please enter your new password below.">
      <Form
        type="resetPassword"
        onSubmit={handleResetPassword}
        submitButtonText="Reset Password"
        token={token}
      />
    </AuthCard>
  );
};
export default ResetPassword;
