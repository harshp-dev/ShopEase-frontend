import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../redux/slices/order';
import { ColumnTypes } from '../../constants/ColumnTypes';
import DataTable from '../../components/common/DataTable';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [localPage, setLocalPage] = useState(0); // 0-based for frontend pagination
  const { user } = useSelector((state) => state.auth);

  const { orders, totalOrders, loading } = useSelector((state) => state.order);

  // Fetch user's orders on page/limit change
  useEffect(() => {
    dispatch(fetchUserOrders({ page: localPage + 1, limit: rowsPerPage }));
  }, [dispatch, localPage, rowsPerPage]);

  const customizedColumns = useMemo(() => {
    return ColumnTypes.orders
      .filter((col) => {
        // 🧠 Skip 'customer' and 'mobileNumber' columns if user is not admin
        if (!user?.isAdmin && ['customer', 'mobileNumber'].includes(col.field)) {
          return false;
        }
        return true;
      })
      .map((col) => {
        if (col.field === 'products') {
          return {
            ...col,
            renderCell: (row) =>
              row.products?.map((item) => `${item.product?.name} × ${item.quantity}`).join(', ') ||
              '-',
          };
        }

        if (col.field === 'address') {
          return {
            ...col,
            renderCell: (row) =>
              ` ${row.address?.street}, ${row.address?.city}, ${row.address?.state} - ${row.address?.zip}`,
          };
        }

        if (col.field === 'createdAt') {
          return {
            ...col,
            renderCell: (row) => new Date(row.createdAt).toLocaleString(),
          };
        }

        if (col.field === 'orderId') {
          return {
            ...col,
            renderCell: (row) => row._id || '-',
          };
        }

        if (col.field === 'customer') {
          return {
            ...col,
            renderCell: (row) => row?.user?.username || '-',
          };
        }

        if (col.field === 'mobileNumber') {
          return {
            ...col,
            renderCell: (row) => row?.user?.mobile || '-',
          };
        }

        return col;
      });
  }, [user]);

  return (
    <div className="p-4">
      <h2 style={{ marginBottom: '1rem' }}>🧾 My Orders</h2>
      <DataTable
        columns={customizedColumns}
        rows={orders || []}
        loading={loading}
        page={localPage}
        rowsPerPage={rowsPerPage}
        total={totalOrders || 0}
        setPage={setLocalPage}
        setRowsPerPage={(limit) => {
          setRowsPerPage(limit);
          setLocalPage(0);
        }}
      />
    </div>
  );
};

export default OrdersPage;
