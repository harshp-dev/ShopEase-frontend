// src/components/ProductInfo.jsx
import { useState } from 'react';
import { Box, Typography, Button, Chip, Divider, Stack, CircularProgress } from '@mui/material';
import { ShoppingCart, Inventory } from '@mui/icons-material';
import { addToCart } from '../../services/ProductService';

const ProductInfo = ({ product }) => {
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product._id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const isInStock = product.stock > 0;

  const titleStyles = {
    fontSize: { xs: '1.75rem', sm: '2.125rem' },
    fontWeight: 600,
    mb: 2,
    lineHeight: 1.2,
  };

  const priceStyles = {
    fontSize: { xs: '1.5rem', sm: '2rem' },
    fontWeight: 700,
    color: 'primary.main',
    mb: 2,
  };

  const descriptionStyles = {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'text.secondary',
    mb: 3,
  };

  const stockInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 3,
    color: 'text.secondary',
  };

  const addToCartButtonStyles = {
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 2,
    },
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={titleStyles}>
        {product.name}
      </Typography>

      <Typography variant="h5" sx={priceStyles}>
        ${product.price.toFixed(2)}
      </Typography>

      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" gap={1}>
        <Chip label={product.category.name} variant="outlined" color="primary" />
        <Chip
          label={isInStock ? 'In Stock' : 'Out of Stock'}
          color={isInStock ? 'success' : 'error'}
          variant={isInStock ? 'filled' : 'outlined'}
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" sx={descriptionStyles}>
        {product.description}
      </Typography>

      <Box sx={stockInfoStyles}>
        <Inventory fontSize="small" />
        <Typography variant="body2">{product.stock} units available</Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleAddToCart}
        disabled={!isInStock || addingToCart}
        startIcon={addingToCart ? <CircularProgress size={20} /> : <ShoppingCart />}
        sx={addToCartButtonStyles}
      >
        {addingToCart ? 'Adding...' : isInStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </Box>
  );
};

export default ProductInfo;
