import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ShoppingCart, Inventory, Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cart';
import Button from '../common/Button';

const ProductInfo = ({ product }) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await dispatch(addItemToCart({ productId: product._id, quantity })).unwrap();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (num) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + num, product.stock)));
  };

  const handleViewCart = () => {
    navigate('/user/cart');
  };

  const isInStock = product.stock > 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Product Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, color: '#154360', lineHeight: 1.3 }}
      >
        {product.name}
      </Typography>

      {/* Price */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
          ₹{product.price.toLocaleString()}
        </Typography>
        {product.originalPrice && product.originalPrice > product.price && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            ₹{product.originalPrice.toLocaleString()}
          </Typography>
        )}
      </Stack>

      {/* Category and Stock Status */}
      <Stack direction="row" spacing={1}>
        <Chip
          label={product.category?.name || 'Uncategorized'}
          color="primary"
          variant="outlined"
        />
        <Chip
          label={isInStock ? 'In Stock' : 'Out of Stock'}
          color={isInStock ? 'success' : 'error'}
          variant="filled"
        />
      </Stack>

      <Divider />

      {/* Description */}
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {product.description}
      </Typography>

      {/* Stock Units */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Inventory fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {product.stock} units available
        </Typography>
      </Stack>

      {/* Quantity Selector */}
      {isInStock && (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Typography variant="body1" fontWeight={500}>
            Quantity:
          </Typography>
          <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
            <Remove />
          </IconButton>
          <TextField
            type="number"
            size="small"
            value={quantity}
            inputProps={{ min: 1, max: product.stock }}
            onChange={(e) =>
              setQuantity(Math.min(Math.max(1, Number(e.target.value) || 1), product.stock))
            }
            sx={{ width: 60 }}
          />
          <IconButton onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
            <Add />
          </IconButton>
        </Stack>
      )}

      {/* Add to Cart and View Cart Buttons */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {addingToCart ? <CircularProgress size={20} color="inherit" /> : <ShoppingCart />}
              {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </Box>
          }
          variant="contained"
          onClick={handleAddToCart}
          disabled={!isInStock || addingToCart}
          sx={{
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            flex: 1,
            '&.Mui-disabled': {
              backgroundColor: 'primary.main',
              opacity: 0.6,
              color: 'white',
            },
          }}
        />
        <Button
          label="View Cart"
          variant="outlined"
          onClick={handleViewCart}
          sx={{
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            flex: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductInfo;
