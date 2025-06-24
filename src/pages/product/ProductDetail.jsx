import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Alert, Button, Fade, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getProductById } from '../../services/ProductService';
import ProductPhotos from '../../components/Product/ProductPhotos';
import ProductInfo from '../../components/Product/ProductInfo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          onClick={() => navigate('/products')}
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Back to Products
        </Button>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          onClick={() => navigate('/products')}
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Back to Products
        </Button>
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          Product not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        onClick={() => navigate('/products')}
        startIcon={<ArrowBack />}
        sx={{ mb: 3, textTransform: 'none' }}
      >
        Back to Products
      </Button>

      <Fade in={true} timeout={500}>
        <Card
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="stretch" justifyContent="center">
              <Grid item xs={12} sm={12} md={6}>
                <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
                  <ProductPhotos images={product.images} productName={product.name} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  sx={{
                    px: { xs: 0, sm: 2 },
                    maxWidth: { md: '100%' },
                  }}
                >
                  <ProductInfo product={product} />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
};

export default ProductDetailPage;
