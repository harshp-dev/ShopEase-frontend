import { useParams, useNavigate } from 'react-router-dom';
import AuthCard from './../../components/common/AuthCard';
import Form from './../../components/common/Form';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    //Yup schema for password validations
    //succes and errror toast messages
    navigate('/login');
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
