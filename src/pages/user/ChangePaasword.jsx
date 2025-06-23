import { useNavigate } from 'react-router-dom';
import AuthCard from './../../components/common/AuthCard';
import Form from './../../components/common/Form';
import { changePassword } from '../../services/AuthService';
import { showErrorToast } from '../../Utils/ToastUtils';

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleChangePassword = async (data) => {
    try {
      await changePassword(data);
      navigate('/');
    } catch (error) {
      showErrorToast(error.message || 'Failed to change your password');
    }
  };

  return (
    <AuthCard title="Change Your Password" subtitle="Please enter your new password below.">
      <Form
        type="changePassword"
        onSubmit={handleChangePassword}
        submitButtonText="Change Password"
      />
    </AuthCard>
  );
};
export default ChangePassword;
