import { useNavigate } from 'react-router-dom';
import AuthCard from './../../components/common/AuthCard';
import Form from './../../components/common/Form';

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    //Yup schema for password validations
    //success and error toast messages
    navigate('/');
  };
  return (
    <AuthCard title="Change Your Password" subtitle="Please enter your new password below.">
      <Form type="changePassword" onSubmit={handleChangePassword} />
    </AuthCard>
  );
};
export default ChangePassword;
