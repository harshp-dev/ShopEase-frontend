import { Box, Typography, Button, AppBar, Toolbar, Container, Grid } from '@mui/material';

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#070142',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          color: '#070142',
          backgroundColor: 'white',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            ShopEase
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container direction="column" alignItems="center" textAlign="center" spacing={4}>
          <Grid item>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Discover. Shop. Smile.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ maxWidth: '500px' }}>
              Welcome to <strong>ShopEase</strong> — your simplified e-commerce destination. Browse
              trendy products, enjoy seamless checkout, and experience smart shopping.
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                sx={{
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  color: '#070142',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: '#aba2fa',
                  },
                }}
              >
                Start Shopping
              </Button>
              <Button
                sx={{
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  color: '#070142',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: '#aba2fa',
                  },
                }}
              >
                Join Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          textAlign: 'center',
          py: 2,
          fontSize: '0.875rem',
          color: '#070142',
          backgroundColor: 'white',
        }}
      >
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </Box>
    </Box>
  );
};

export default LandingPage;
