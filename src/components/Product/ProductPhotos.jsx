// src/components/ProductPhotos.jsx
import { useState } from 'react';
import { Box, Grid, CardMedia, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ProductPhotos = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const mainImageStyles = {
    width: '100%',
    height: { xs: 300, sm: 400, md: 500 },
    objectFit: 'cover',
    borderRadius: 2,
    mb: 2,
    bgcolor: 'grey.100',
  };

  const thumbnailStyles = {
    width: '100%',
    height: { xs: 60, sm: 80 },
    objectFit: 'cover',
    borderRadius: 1,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 2,
    },
  };

  const containerStyles = {
    position: 'relative',
  };

  const navButtonStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    bgcolor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.9)',
    },
    zIndex: 1,
  };

  if (!images || images.length === 0) {
    return (
      <Box sx={mainImageStyles}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'text.secondary',
          }}
        >
          No image available
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Main Image with Navigation */}
      <Box sx={containerStyles}>
        <CardMedia
          component="img"
          image={images[selectedImage]}
          alt={`${productName} - Main view`}
          sx={mainImageStyles}
        />

        {images.length > 1 && (
          <>
            <IconButton onClick={handlePrevImage} sx={{ ...navButtonStyles, left: 16 }}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={handleNextImage} sx={{ ...navButtonStyles, right: 16 }}>
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <Grid container spacing={1}>
          {images.map((image, index) => (
            <Grid item xs={3} sm={3} md={3} key={index}>
              <CardMedia
                component="img"
                image={image}
                alt={`${productName} - View ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                sx={{
                  ...thumbnailStyles,
                  border: selectedImage === index ? 3 : 2,
                  borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductPhotos;
