import { IconButton } from '@mui/material';

const Arrow = ({ onClick, disabled, icon, position = 'left' }) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        position: 'absolute',
        [position]: -10,
        top: '30%',
        zIndex: 1,
        bgcolor: 'grey',
        boxShadow: 1,
        opacity: disabled ? 0.3 : 1,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default Arrow;
