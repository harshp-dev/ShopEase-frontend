import { Button as MuiButton } from '@mui/material';

const Button = ({ label, variant = 'contained', onClick, type = 'button', disabled = false }) => {
  return (
    <MuiButton variant={variant} type={type} onClick={onClick} disabled={disabled}>
      {label}
    </MuiButton>
  );
};

export default Button;
