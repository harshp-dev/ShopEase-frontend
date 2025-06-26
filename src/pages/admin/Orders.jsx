import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Chip } from '@mui/material';
import { fetchOrdersForAdmin } from '../../redux/slices/order';
import { ColumnTypes } from '../../constants/ColumnTypes';
import DataTable from '../../components/common/DataTable';

function Orders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { orders, loading, totalOrders } = useSelector(
    (state) =>
      state.order || {
        orders: [],
        loading: false,
        totalOrders: 0,
      },
  );

  useEffect(() => {
    dispatch(fetchOrdersForAdmin({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const transformedOrders = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      orderId: order._id?.slice(-8) || 'N/A',
      customer: (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {order.user?.username || 'N/A'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {order.user?.email || 'N/A'}
          </Typography>
        </Box>
      ),
      products: (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          {order.products?.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {item.product && item.product.images && item.product.images.length > 0 ? (
                <>
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <Chip
                    label={`×${item.quantity}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem', height: '20px' }}
                  />
                </>
              ) : (
                <Chip
                  label={`Product Unavailable ×${item.quantity}`}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              )}
            </Box>
          ))}
        </Box>
      ),
      totalAmount: `₹${order.totalAmount?.toLocaleString('en-IN') || 0}`,
      address: (() => {
        const addr = order.address;
        return addr ? `${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}` : 'N/A';
      })(),
      createdAt: new Date(order.createdAt).toLocaleDateString('en-IN'),
      paymentId: order.paymentId?.slice(-12) || 'N/A',
    }));
  }, [orders]);

  return (
    <div className="p-4">
      <h2
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          marginBottom: '32px',
        }}
      >
        Orders Management
      </h2>
      <DataTable
        columns={ColumnTypes.orders}
        rows={transformedOrders}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        total={totalOrders}
        setPage={setPage}
        setRowsPerPage={(limit) => {
          setRowsPerPage(limit);
          setPage(0);
        }}
      />
    </div>
  );
}

export default Orders;
