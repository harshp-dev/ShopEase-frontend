import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart, updateCartQuantity, deleteCartItem } from '../../redux/slices/cart.js';
import { Container, Typography, Stack } from '@mui/material';
import CartItemCard from '../../components/Product/CartItemCard';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrement = (productId) => {
    const item = items.find((item) => item.product._id === productId);
    dispatch(updateCartQuantity({ productId, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (productId) => {
    const item = items.find((item) => item.product._id === productId);
    if (item.quantity > 1) {
      dispatch(updateCartQuantity({ productId, quantity: item.quantity - 1 }));
    } else {
      dispatch(deleteCartItem(productId));
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 600,
          mb: 4,
        }}
      >
        Your Cart
      </Typography>

      <Stack spacing={3}>
        {items.map((item) => (
          <CartItemCard
            key={item.product._id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={() => dispatch(deleteCartItem(item.product._id))}
          />
        ))}
      </Stack>

      <Typography variant="h6" mt={5}>
        Total Price: ₹{totalPrice}
      </Typography>
      <Button
        label="Proceed to Checkout"
        onClick={() => navigate('/user/checkout')}
        sx={{ mt: 4 }}
      />
    </Container>
  );
};

export default CartPage;
