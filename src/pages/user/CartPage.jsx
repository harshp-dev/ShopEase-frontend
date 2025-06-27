import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCart, updateCartQuantity, deleteCartItem } from '../../redux/slices/cart.js';
import { Container, Typography, Stack } from '@mui/material';
import CartItemCard from '../../components/Product/CartItemCard';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import { showErrorToast } from '../../Utils/ToastUtils.jsx';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);

        await dispatch(fetchCart()).unwrap();
      } catch (err) {
        showErrorToast(err, 'Failed to load cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
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
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
          color: 'text.primary',
          mb: 4,
        }}
      >
        Your Cart
      </Typography>

      {!loading && items.length === 0 ? (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
          <Button label="Browse Products" onClick={() => navigate('/user')} />
        </Stack>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default CartPage;
