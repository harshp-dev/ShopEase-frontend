import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner = ({ size = 40, minHeight = '400px', message = 'Loading...' }) => {
  const spinnerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: minHeight,
    gap: 2,
  };

  return (
    <Box sx={spinnerStyles}>
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
