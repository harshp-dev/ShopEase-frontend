import { CardContent, Typography, Box, Container, Paper } from '@mui/material';

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
        <CardContent>
          {title && (
            <Typography variant="h5" gutterBottom align="center">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom align="center">
              {subtitle}
            </Typography>
          )}
          <Box mt={2}>{children}</Box>
        </CardContent>
      </Paper>
    </Container>
  );
};

export default AuthCard;
