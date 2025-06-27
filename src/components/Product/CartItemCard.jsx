import { Add, Delete, Remove } from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';

const CartItemCard = ({ item, isCheckout = false, onIncrement, onDecrement }) => {
  const { product, quantity } = item;

  return (
    <Card sx={{ display: 'flex', gap: 2, p: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, borderRadius: 1 }}
        image={product.images[0]?.url || 'https://via.placeholder.com/120'}
        alt={product.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">
          {isCheckout && quantity > 1 ? `${quantity}x ${product.name}` : product.name}
        </Typography>
        <Typography color="text.secondary">₹{product.price}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description || 'No description available'}
        </Typography>
        {!isCheckout && (
          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <IconButton
              onClick={() => onDecrement(product._id)}
              sx={{ border: 1, borderColor: 'grey.400' }}
            >
              {quantity > 1 ? <Remove /> : <Delete />}
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton
              onClick={() => onIncrement(item.product._id)}
              disabled={item.quantity >= item.product.stock}
              sx={{ border: 1, borderColor: 'grey.400' }}
            >
              <Add />
            </IconButton>
          </Stack>
        )}
        <Typography variant="body1" fontWeight="bold" mt={1}>
          Subtotal: ₹{product.price * quantity}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
