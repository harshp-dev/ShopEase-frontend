import { useState } from 'react';
import { Box, Grid, CardMedia, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ProductPhotos = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0 || !images.every((img) => img.url)) {
    return (
      <Box
        sx={{
          width: '100%',
          height: { xs: 300, sm: 400, md: 500 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 2,
          border: '2px dashed',
          borderColor: 'grey.300',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No image available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2,
          boxShadow: 2,
        }}
      >
        <CardMedia
          component="img"
          image={images[selectedImage].url}
          alt={`${productName} - Main view`}
          sx={{
            width: '100%',
            height: { xs: 300, sm: 400, md: 450 },
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />

        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,1)',
                },
                boxShadow: 2,
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,1)',
                },
                boxShadow: 2,
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.875rem',
            }}
          >
            {selectedImage + 1} / {images.length}
          </Box>
        )}
      </Box>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <Grid container spacing={1} justifyContent="center">
          {images.map((image, index) => (
            <Grid item key={index}>
              <CardMedia
                component="img"
                image={image.url}
                alt={`${productName} - View ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: 2,
                  borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 2,
                  },
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
