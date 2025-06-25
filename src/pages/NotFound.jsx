import React from 'react';
import { Box, Container } from '@mui/material';
import svg from '../assests/404.svg';

const PageNotFound = () => {
  return (
    <Container
      maxWidth="full"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: '#e3f2ff',
      }}
    >
      <Box
        component="img"
        src={svg}
        alt="404 Not Found"
        sx={{
          width: '100%',
          maxWidth: 600,
          filter: 'hue-rotate(201deg) saturate(120%) brightness(90%)',
        }}
      />
    </Container>
  );
};

export default PageNotFound;
