import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Stack,
  CircularProgress,
  TextField,
  IconButton,
} from '@mui/material';
import { ShoppingCart, Inventory, Add, Remove } from '@mui/icons-material';
import { addToCart } from '../../services/ProductService';

const ProductInfo = ({ product }) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product._id, quantity);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (num) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + num, product.stock)));
  };

  const isInStock = product.stock > 0;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
          fontWeight: 700,
          mb: 2,
          lineHeight: 1.2,
          color: 'text.primary',
        }}
      >
        {product.name}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
          fontWeight: 600,
          color: 'primary.main',
          mb: 3,
        }}
      >
        ₹{product.price.toFixed(2)}
      </Typography>

      <Stack direction="row" spacing={1} mb={3}>
        <Chip
          label={product.category?.name || 'N/A'}
          variant="outlined"
          color="primary"
          size="medium"
        />
        <Chip
          label={isInStock ? 'In Stock' : 'Out of Stock'}
          color={isInStock ? 'success' : 'error'}
          variant="filled"
          size="medium"
        />
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '1rem', sm: '1.1rem' },
          lineHeight: 1.7,
          color: 'text.secondary',
          mb: 3,
          flex: 1,
        }}
      >
        {product.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Inventory fontSize="small" color="action" />
        <Typography
          variant="body2"
          sx={{
            ml: 1,
            fontSize: '1rem',
            color: 'text.secondary',
          }}
        >
          {product.stock} units available
        </Typography>
      </Box>

      {isInStock && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
            Quantity:
          </Typography>
          <IconButton
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            size="medium"
            sx={{ border: 1, borderColor: 'grey.300' }}
          >
            <Remove />
          </IconButton>
          <TextField
            value={quantity}
            type="number"
            size="small"
            inputProps={{ min: 1, max: product.stock }}
            sx={{ width: 80, mx: 1 }}
            onChange={(e) => setQuantity(Math.min(Number(e.target.value) || 1, product.stock))}
          />
          <IconButton
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            size="medium"
            sx={{ border: 1, borderColor: 'grey.300' }}
          >
            <Add />
          </IconButton>
        </Box>
      )}

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleAddToCart}
        disabled={!isInStock || addingToCart}
        startIcon={addingToCart ? <CircularProgress size={20} /> : <ShoppingCart />}
        sx={{
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 2,
          mt: 'auto',
        }}
      >
        {addingToCart ? 'Adding...' : isInStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </Box>
  );
};

export default ProductInfo;
