import Navbar from './Navbar';
import { Box, Container } from '@mui/material';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
          <Navbar />
        </Box>
        <main>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </main>
      </Box>
    </>
  );
};

export default DashboardLayout;
