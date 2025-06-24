// src/pages/ProductDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Box, Alert, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getProductById } from '../../services/ProductService';
import ProductPhotos from '../../components/Product/ProductPhotos';
import ProductInfo from '../../components/Product/ProductInfo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const containerStyles = {
    py: { xs: 2, sm: 4 },
    px: { xs: 1, sm: 2 },
  };

  const backButtonStyles = {
    mb: 3,
    textTransform: 'none',
    color: 'text.secondary',
    '&:hover': {
      bgcolor: 'grey.100',
    },
  };

  const gridContainerStyles = {
    spacing: { xs: 3, sm: 4 },
    alignItems: 'flex-start',
  };

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={containerStyles}>
        <Alert
          severity="error"
          sx={{
            mb: 2,
            '& . MuiAlert-message': {
              fontSize: '1.1rem',
            },
          }}
        >
          {error}
        </Alert>
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
          startIcon={<ArrowBack />}
          sx={backButtonStyles}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={containerStyles}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Product not found
        </Alert>
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
          startIcon={<ArrowBack />}
          sx={backButtonStyles}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={containerStyles}>
      {/* Back Button */}
      <Button
        variant="text"
        onClick={() => window.history.back()}
        startIcon={<ArrowBack />}
        sx={backButtonStyles}
      >
        Back to Products
      </Button>

      {/* Main Content */}
      <Grid container sx={gridContainerStyles}>
        <Grid item xs={12} md={6}>
          <ProductPhotos images={product.images} productName={product.name} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <ProductInfo product={product} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
