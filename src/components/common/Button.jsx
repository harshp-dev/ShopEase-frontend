import { Button as MuiButton } from '@mui/material';

const Button = ({
  label,
  variant = 'contained',
  onClick,
  type = 'button',
  disabled = false,
  sx = {},
}) => {
  return (
    <MuiButton variant={variant} type={type} onClick={onClick} disabled={disabled} sx={sx}>
      {label}
    </MuiButton>
  );
};

export default Button;
