import { Card, CardContent, CardMedia, Typography, IconButton, Stack } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const CartItemCard = ({ item, onIncrement, onDecrement }) => {
  const { product, quantity } = item;

  return (
    <Card sx={{ display: 'flex', gap: 2, p: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, borderRadius: 1 }}
        image={product.images[0]?.url}
        alt={product.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">₹{product.price}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <IconButton onClick={() => onDecrement(product._id)}>
            {quantity > 1 ? <Remove /> : <Delete />}
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={() => onIncrement(product._id)}>
            <Add />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
