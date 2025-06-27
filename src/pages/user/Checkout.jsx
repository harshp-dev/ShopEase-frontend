import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Stack, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getCart, clearCart } from '../../services/CartService';
import { placeOrder } from '../../redux/slices/order';
import CartItemCard from '../../components/Product/CartItemCard';
import Form from '../../components/common/Form';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart({
          items: cartData.items || [],
          totalPrice: cartData.totalPrice || 0,
        });
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (cart.items.length === 0) {
        throw new Error('Cart is empty.');
      }

      const orderData = {
        user: user._id,
        products: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        address: data.address,
        mobileNumber: data.mobileNo,
      };

      await dispatch(placeOrder(orderData)).unwrap();
      const cleared = await clearCart();
      setCart({ items: cleared.items, totalPrice: cleared.totalPrice });

      navigate('/user/orders');
    } catch (error) {
      console.error('Order placement error:', error);
    }
  };

  if (loading) {
    return (
      <Box minHeight="60vh" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading cart...</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="lg" mx="auto" px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Checkout
      </Typography>

      {cart.items.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4}>
          {/* Left - Cart Details */}
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cart Items
            </Typography>
            <Stack spacing={2}>
              {cart.items.map((item) => (
                <CartItemCard key={item.product._id} item={item} isCheckout />
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight="bold">
              Total: ₹{cart.totalPrice.toLocaleString('en-IN')}
            </Typography>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Form
              type="checkout"
              onSubmit={handleSubmit}
              defaultValues={{
                address: { street: '', city: '', state: '', zip: '' },
                mobileNo: '',
              }}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Checkout;
