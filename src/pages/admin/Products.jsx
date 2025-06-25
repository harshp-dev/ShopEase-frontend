import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsForAdmin } from '../../redux/slices/product';
import { ColumnTypes } from '../../constants/ColumnTypes';
import DataTable from '../../components/common/DataTable';

function Products() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { products, loading, total } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProductsForAdmin({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleEdit = (row) => {
    console.log('Edit product:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete product:', row);
  };

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
        Product List
      </h2>
      <DataTable
        columns={ColumnTypes.product}
        rows={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
        total={total}
        setPage={setPage}
        setRowsPerPage={(limit) => {
          setRowsPerPage(limit);
          setPage(0);
        }}
      />
    </div>
  );
}

export default Products;
